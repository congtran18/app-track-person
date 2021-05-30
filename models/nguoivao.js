class Nguoivao{
    constructor(id, date, image, realname) {
        this.id = id;
        this.date = date;
        this.image = image;
        this.realname = realname;
      }
    get readableDate() {
    return this.date.toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    }
}

export default Nguoivao;