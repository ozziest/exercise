<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Book;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    return [
        'name' => ucwords($faker->words(random_int(1, 3), true)),
        'release_date' => $faker->date
    ];
});
