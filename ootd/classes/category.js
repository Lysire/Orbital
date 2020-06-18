// encapsulates a category object for categorizing both outfits and clothes
// categories will be used for clothes and events will be used for outfits

/* 
 * id: id of the category
 * title: name of the category
 * color: the color of the category 
 */  

class Category {
  constructor(id, title, color) {
    this.id = id;
    this.title = title;
    this.color = color; // to replace this with images if need be
  }
}

export default Category;
