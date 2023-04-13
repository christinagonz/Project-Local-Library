const { sortAccountsByLastName } = require("./accounts");
const { partitionBooksByBorrowedStatus } = require("./books");

// function for counting books
 // takes in an array of books
// returns num of books in the array
function getTotalBooksCount(books) {
  return books.length;
}

// function for counting accounts
// takes in an array of accounts
// returns num of accounts in array 
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// function for counting books that are borrowed 
// takes in an array of books
// returns count of books that are borrowed
function getBooksBorrowedCount(books) {
  const status = partitionBooksByBorrowedStatus(books);
  return status[0].length;
}

// function for most common generes
// takes in an array of books
// returns 5 objects from most to least popular 
function getMostCommonGenres(books) {
  const genres = getAllGenres(books);
  const countList = [];
  
  genres.forEach(genre => {
    // run through all the books in a genre, then count the number of books and push the total
    const genreBooks = books.filter(book => book.genre === genre);
    countList.push(genreBooks.length);
  });

  return getSortedTopFiveNameCount(genres, countList);
}

// function for most popular books
// takes in an array of books 
// returns 5 books from most to least popular
function getMostPopularBooks(books) {
  const bookList = [];
  const countList = [];
  const bookIdList = [];

  books.forEach(book => {
    // check how many times books are listed 
    if(!bookIdList.includes(book.id)){
      bookIdList.push(book.id);
      bookList.push(book.title);
      //take the book title count and push to the list
      countList.push(book.borrows.length);
    };
  });
  
  return getSortedTopFiveNameCount(bookList, countList);
}

// fucntion for most popular authors
// takes in an array of books and an array of authors
// returns list of 5 authors from most to least popular
function getMostPopularAuthors(books, authors) {
  const authorList = [];
  const countList = [];
  const authorIdList = [];

  authors.forEach(author => {
   // how many times are authors listed 
    if (!authorIdList.includes(author.id)) {
    authorIdList.push(author.id);
    authorList.push(`${author.name.first} ${author.name.last}`);
    // make list of authors books and times borrowed 
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBooksBorrows = authorBooks.map(book => book.borrows.length);
    countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
    }
  });
  
  return getSortedTopFiveNameCount(authorList, countList);
}

// HELPER FUNCTIONS

// function listing all genres in book array
//takes in array of books
// returns all the genres in the array
function getAllGenres (books) {
  const genres = [];
  books.forEach(book => {
    if (!genres.includes(book.genre)) genres.push(book.genre);
  });
  return genres;
}

// function putting arrguments in [{name: descriptop, count: 0}] format
//takes in array of names and counts
// returns formatted array
function makeNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}

// function listing from highest to lowest
// takes in nameCount array
//returns sorted array
function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}

// a function limiting list to 5 or fewer items
// take in list array
// returns an array thats 5 or fewer
function topFive (list) {
  while (list.length > 5) {
    list.pop();
  }
  return list;
}

//function to format most common lists
  //  takes in array of names and counts
// returns an array of objects sorted largest to smallest and only 5 long 
function getSortedTopFiveNameCount (nameList, countList)
{
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
