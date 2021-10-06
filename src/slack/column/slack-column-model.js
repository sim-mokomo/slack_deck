"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackColumnModel = void 0;
class SlackColumnModel {
    constructor(id) {
        this.onChangedSize = () => { return; };
        this.id = id;
        this.posX = 0;
        this.posY = 0;
        this.width = 0;
        this.height = 0;
    }
    setSize(x, y, width, height) {
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;
        this.onChangedSize(this.posX, this.posY, this.width, this.height);
    }
}
exports.SlackColumnModel = SlackColumnModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xhY2stY29sdW1uLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2xhY2stY29sdW1uLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsZ0JBQWdCO0lBU3pCLFlBQVksRUFBUztRQUZyQixrQkFBYSxHQUErRCxHQUFHLEVBQUUsR0FBRyxPQUFNLENBQUMsQ0FBQyxDQUFBO1FBR3hGLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1FBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7SUFDbkIsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFRLEVBQUUsQ0FBUSxFQUFDLEtBQVksRUFBRSxNQUFjO1FBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNwRSxDQUFDO0NBQ0o7QUF4QkQsNENBd0JDIn0=