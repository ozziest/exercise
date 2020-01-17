<?php

use Illuminate\Database\Seeder;
use App\Author;
use App\Book;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $authors = factory(App\Author::class, 10)->create();
        $books = factory(App\Book::class, 30)->make()->each(function($book) use ($authors) {
            $book->author_id = $authors->random()->id;
            $book->save();
        });
    }
}
