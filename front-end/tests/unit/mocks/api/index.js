export default {
  current_page: 2,
  last_page: 7,
  data: [
    {
      id: 1,
      name: 'Karl Popper',
      age: 92,
      address: 'Vienna',
      books: [
        {
          id: 1,
          author_id: 1,
          name: 'The Logic Of Scientific Discovery',
          release_date: '1959-07-28'  
        }
      ]
    },
    {
      id: 2,
      name: 'Martin Fowler',
      age: 45,
      address: 'USA',
      books: [
        {
          id: 2,
          author_id: 2,
          name: 'Refactoring',
          release_date: '1999-01-01'
        }
      ]
    },
    {
      id: 3,
      name: 'Kent Beck',
      age: 50,
      address: 'USA',
      books: []
    }
  ]
}
