// encapsulates a clothes object

/* 
 * id: id of the clothing item
 * categoryIDs: id's of the categories clothing belongs to
 * outfitIDs: id's of the outfits clothing belongs to 
 * title: the name of the clothing item
 * imageURL: url to use to display image of the clothing
 * size: size of the clothing item
 * desc: additional descriptions of the item
 */  

class Clothes {
  constructor(id, categoryIDs, outfitIDs, title, imageURL, size, desc) 
  {
    this.id = id;
    this.categoryIDs = categoryIDs;
    this.outfitIDs = outfitIDs;
    this.title = title;
    this.imageURL = imageURL;
    this.size = size;
    this.desc = desc;
  }
}

export default Clothes;
