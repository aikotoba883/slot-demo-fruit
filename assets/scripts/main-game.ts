import { _decorator, Component, Label, Node, Button } from 'cc';
import { Grid, LocalSlotServer, MockTransport, NumberUtil, sampleGame, SeededRng, SlotClient, SlotClientState, SpinResult } from '../core-engine/src/index';
import { SymbolData } from './symbol-data';
const { ccclass, property } = _decorator;

@ccclass('MainGame')
export class MainGame extends Component {

    @property(Node)
    reelMask: Node = null;
    @property(Label)
    balanceTxtLabel: Label = null;
    @property(Label)
    betTxtLabel: Label = null;
    @property(Label)
    winTxtLabel: Label = null;
    @property(Button)
    btnSpin: Button = null;

    private client: SlotClient = null;

    protected onLoad(): void {
        const server = new LocalSlotServer(sampleGame, new SeededRng(Date.now()));
        this.client = new SlotClient(new MockTransport(server), {
            initialBalance: 1000,
            defaultBet: 10,
            events: {
                onStateChange: (s) => this.refreshHud(s),
                onSpinStart: () => { this.winTxtLabel.string = NumberUtil.format(0, { decimals: 2 }); },
                onSettled: (r) => this.onSettled(r),
            }
        });

        this.btnSpin.node.on(Button.EventType.CLICK, this.onSpinClick, this);
    }
    start() {
        this.refreshHud(this.client.getState());
        this.winTxtLabel.string = NumberUtil.format(0, { decimals: 2 });
    }
    private onSpinClick(): void {
        this.client.spin().catch((e) => console.warn("[MainGame] spin 被拒:", e));
    }
    private refreshHud(s: Readonly<SlotClientState>) {
        this.balanceTxtLabel.string = NumberUtil.format(s.balance, { decimals: 2 });
        this.betTxtLabel.string = NumberUtil.format(s.bet, { decimals: 2 });
        this.btnSpin.interactable = s.phase === "idle";
    }
    private onSettled(result: SpinResult): void {
        this.renderGrid(result.grid);
        this.winTxtLabel.string = NumberUtil.format(result.totalWin, { decimals: 2 });
        console.log("SpinResult.grid", result.grid);
    }
    private renderGrid(grid: Grid) {
        for (let col: number = 0; col < grid.length; col++) {
            const reel = this.reelMask.getChildByName(`Reel_${col}`);
            for (let row: number = 0; row < grid[col].length; row++) {
                reel.getChildByName(`Row_${row}`).getChildByName("Symbol").getComponent(SymbolData).setSymbol(grid[col][row]);
            }
        }
    }
}
