import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { Bookmark } from './bookmark.model';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBokkmarkDto } from './dto/get.bookmark.dto';
import {UpdateBookmarkDto} from "./dto/update.bookmark.dto";

@Controller('bookmarks')
export class BookmarksController {
    constructor (private bookmarksService : BookmarksService){}

  
   @Get() 
   // http://localhost/3000/bookmarks
    find(@Query()  getBookmarkDto:GetBokkmarkDto):Bookmark[]{

        let bookmarks : Bookmark[] = [];
        if(Object.keys(getBookmarkDto).length) {
            bookmarks = this.bookmarksService.find(getBookmarkDto);
        }else{
            bookmarks = this.bookmarksService.findAll();
        }
      return bookmarks;
    }

    // http://localhost/3000/bookmarks/id
    @Get('/:id')
    findByID( @Param('id')  id : string):Bookmark{
      return this.bookmarksService.findByID(id);  
    }

    @Post()
    createBookmark(@Body() creatBookmarkDto:CreateBookmarkDto):Bookmark[]{ 
      return this.bookmarksService.createBookmark(creatBookmarkDto) ; 
    }


    @Delete('/:id')
     deleteBokkmark(@Param('id') id : string) : void {
        return this.bookmarksService.deleteBookmark(id);
    }

    @Patch()
     updateBookmark(@Body() updateBookmarkDto : UpdateBookmarkDto):Bookmark{
        console.log('omaaad')
        return this.bookmarksService.updateBookMark(updateBookmarkDto);
    }




}

