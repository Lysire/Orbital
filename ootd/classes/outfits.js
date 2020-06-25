// encapsulates an outfit combination object

/* 
 * id: id of the outfit combination
 * eventIDs: id's of the events outfit combination belongs to
 * title: name of the outfit combination
 * imageURL: url to display image of outfit
 * desc: additional descriptions of the item
 */  

class Outfits {
    constructor(id, eventIDs, title, color, desc) 
    {
      this.id = id;
      this.eventIDs = eventIDs;
      this.title = title;
      this.color = color; // use color for min viable pdt
      this.desc = desc;
    }
  }
  
  export default Outfits;
  