"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackColumnModel = void 0;
class SlackColumnModel {
    constructor(id) {
        this.onChangedSize = () => { return; };
        this.id = id;
        this.rectangle = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }
    setSize(rectangle) {
        this.rectangle = rectangle;
        this.onChangedSize(rectangle);
    }
}
exports.SlackColumnModel = SlackColumnModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stY29sdW1uLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xhY2stY29sdW1uLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsZ0JBQWdCO0lBTXpCLFlBQVksRUFBUztRQUZyQixrQkFBYSxHQUE2QyxHQUFHLEVBQUUsR0FBRyxPQUFNLENBQUMsQ0FBQyxDQUFBO1FBR3RFLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1NBQ1osQ0FBQTtJQUNMLENBQUM7SUFFRCxPQUFPLENBQUMsU0FBOEI7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0NBQ0o7QUFwQkQsNENBb0JDIn0=