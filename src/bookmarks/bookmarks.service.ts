import { Injectable } from '@nestjs/common';
import { Bookmark } from './bookmark.model';
import { v4 as uuid} from 'uuid';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBokkmarkDto } from './dto/get.bookmark.dto';
import {UpdateBookmarkDto} from "./dto/update.bookmark.dto";


@Injectable()
export class BookmarksService {
  private bookmarks : Bookmark[] = [{id:uuid(),url:'https://google.com'}]; 


  findAll():Bookmark[]{
    return this.bookmarks;
  }

  find(getBookmarkDto:GetBokkmarkDto):Bookmark[]{
    let bookmarks = this.findAll();
    const {url} = getBookmarkDto;
    if(url){
      bookmarks = bookmarks.filter((bookmark)=>bookmark.url.toLowerCase().includes(url))
    }
   return bookmarks;
  }
  
  findByID(ID:string):Bookmark{
    return this.bookmarks.find((bookmark)=>bookmark.id == ID);
  }



  createBookmark(createBookmarkDto : CreateBookmarkDto):Bookmark[]{
    const {url} = createBookmarkDto
    const bookmark : Bookmark = {id:uuid(),url};
    this.bookmarks.push(bookmark);
    return this.bookmarks;
  }

  deleteBookmark(id:string) : void {
    this.bookmarks = this.bookmarks.filter((bookmark)=> bookmark.id != id)
  }


  updateBookMark(updateBookmarkDto : UpdateBookmarkDto):Bookmark{
    const bookmark = this.findByID(updateBookmarkDto.id)
    if(updateBookmarkDto.url){
      bookmark.url = updateBookmarkDto.url
    }
    return bookmark;
  }




  

}
