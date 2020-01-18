<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthorTest extends TestCase
{
    use RefreshDatabase;

    /**
     * I should be able to see a form validation error
     *
     * @return void
     */
    public function testEmptyFormBody()
    {
        $response = $this->postJson('/api/authors');
        $response->assertStatus(422);
        $response->assertSee('The author.name field is required.');
        $response->assertSee('The author.age field is required.');
        $response->assertSee('The author.address field is required.');
        $response->assertSee('The book.name field is required.');
        $response->assertSee('The book.release date field is required.');
    }

    /**
     * I should be able to see a form validation error when I send null data
     *
     * @return void
     */
    public function testNullFormData()
    {
        $response = $this->postJson('/api/authors', [
            'author' => [
                'name' => null,
                'age' => null,
                'address' => null
            ],
            'book' => [
                'name' => null,
                'release_date' => null
            ]
        ]);
        $response->assertStatus(422);
        $response->assertSee('The author.name field is required.');
        $response->assertSee('The author.age field is required.');
        $response->assertSee('The author.address field is required.');
        $response->assertSee('The book.name field is required.');
        $response->assertSee('The book.release date field is required.');
    }

    /**
     * I should be able to see a form validation error when I send 
     * unaccepted form data.
     *
     * @return void
     */
    public function testUnacceptedFormData()
    {
        $longAddress = '
            Dolor qui ut ut aliquip ullamco officia adipisicing enim commodo sunt officia consectetur.
            Occaecat enim Lorem adipisicing dolore irure esse irure quis ad sit. Sit esse labore mollit
            proident esse dolor excepteur id consectetur. Sit esse labore mollit proident esse
            dolor excepteur id consectetur.
        ';
        $response = $this->postJson('/api/authors', [
            'author' => [
                'name' => 'This is a name which is too long for the field but we should try.',
                'age' => 200,
                'address' => $longAddress
            ],
            'book' => [
                'name' => 'This is a name which is too long for the field but we should try.',
                'release_date' => '1959-07-28'
            ]
        ]);
        $response->assertStatus(422);
        $response->assertSee('The author.name may not be greater than 50 characters.');
        $response->assertSee('The author.age must be between 0 and 120.');
        $response->assertSee('The author.address may not be greater than 255 characters.');
        $response->assertSee('The book.name may not be greater than 50 characters.');
    }

    /**
     * I should be able to create an author with a new book.
     *
     * @return void
     */
    public function testPagination()
    {
        $response = $this->postJson('/api/authors', [
            'author' => [
                'name' => 'Karl Popper',
                'age' => 92,
                'address' => 'Vienna'
            ],
            'book' => [
                'name' => 'The Logic Of Scientific Discovery',
                'release_date' => '1959-07-28'
            ]
        ]);
        $response->assertStatus(200);
        
        // I should be able to see all author with their books with pagination.
        $response = $this->getJson('/api/authors');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                [
                    'id',
                    'name',
                    'age',
                    'address',
                    'created_at',
                    'updated_at',
                    'books' => [
                        [
                            'id',
                            'author_id',
                            'name',
                            'release_date',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]
            ],
            'first_page_url',
            'from',
            'last_page',
            'last_page_url',
            'next_page_url',
            'path',
            'per_page',
            'prev_page_url',
            'to',
            'total'
        ]);        
    }
}
