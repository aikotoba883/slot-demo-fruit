import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SymbolData')
export class SymbolData extends Component {
    @property(Sprite)
    symbolIcon: Sprite = null;
    @property(Label)
    symbolName: Label = null;

    symbolConfig = null;
    init(): void {

    }

    setIcon(symbolID: number): void {

    }
    getIcon(): number {
        return;
    }

    setName(symbolID: number): void {

    }
    getName(): number {
        return;
    }

    update(deltaTime: number) {

    }
}


