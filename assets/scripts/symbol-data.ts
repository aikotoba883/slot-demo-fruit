import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SymbolData')
export class SymbolData extends Component {
    @property(Sprite)
    symbolIcon: Sprite = null;
    @property(Label)
    symbolName: Label = null;

    currentID: number = null;
    init(): void {

    }
    public setSymbol(symbolID: number): void {
        this.currentID = symbolID;
        this.setIcon(this.currentID);
        this.setName(this.currentID);
    }
    private setIcon(symbolID: number): void {
        this.symbolIcon.spriteFrame = null;
    }
    getIcon(): SpriteFrame {
        return this.symbolIcon.spriteFrame;
    }
    private setName(symbolID: number): void {
        this.symbolName.string = null;
    }
    getName(): string {
        return this.symbolName.string;
    }
    update(deltaTime: number) {

    }
}


