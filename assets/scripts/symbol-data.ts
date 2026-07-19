import { _decorator, Component, Label, Sprite, Color } from 'cc';
import type { SymbolId } from '../core-engine/src/index';
const { ccclass, property } = _decorator;

const hex = (h: string) => new Color().fromHEX(h);
const PLACEHOLDER: Record<string, { icon: Color; text: Color }> = {
    cherry: { icon: hex("#E53935"), text: hex("#FFFFFF") },
    lemon: { icon: hex("#FDD835"), text: hex("#212121") },
    bell: { icon: hex("#FB8C00"), text: hex("#212121") },
    bar: { icon: hex("#212121"), text: hex("#FFFFFF") },
    seven: { icon: hex("#1E88E5"), text: hex("#FFFFFF") },
    diamond: { icon: hex("#00ACC1"), text: hex("#FFFFFF") },
};

@ccclass("SymbolData")
export class SymbolData extends Component {
    @property(Sprite) symbolIcon: Sprite = null; // 留空則 onLoad 自動抓本節點 Sprite
    @property(Label) symbolName: Label = null;  // 留空則 onLoad 自動抓子節點 NameLabel

    private currentId: SymbolId = "";

    onLoad() {
        this.symbolIcon ??= this.getComponent(Sprite);
        this.symbolName ??= this.node.getChildByName("NameLabel")?.getComponent(Label) ?? null;
    }

    /** 唯一渲染入口：依引擎 symbol id 渲染本格；查無 id 時 warn 並保持原樣 */
    setSymbol(id: SymbolId): void {
        const cfg = PLACEHOLDER[id];
        if (!cfg) { console.warn(`[SymbolData] 未知符號 id：${id}`); return; }
        this.currentId = id;
        this.symbolIcon.color = cfg.icon;   // Cocos 的 color setter 會複製值，共用 Color 物件安全
        this.symbolName.string = id;        // 小寫符號名＝任務2 佔位字規約
        this.symbolName.color = cfg.text;
    }

    getSymbol(): SymbolId { return this.currentId; }
}
