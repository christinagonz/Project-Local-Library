// fuction for fiding author by id number
// takes in an array of authors and id 
// returns the authors info for that id 

function findAuthorById(authors, id) {
  return authors.find(author => id === author.id);
}

// function for finding a book by id number 
// takes in an array of books and id 
// returns the book info for that id 
function findBookById(books, id) {
  return books.find(book => book.id === id);
}

// a function dividing books by borrowed status
//takes in array of books
// returns an array with array for borrowed books and unborrowed books
function partitionBooksByBorrowedStatus(books) {
  const result = [];
  // if they're returned put them in one array, if not put them in another
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  const unborrowedBooks = books.filter(book => book.borrows[0].returned);
  // push the borrowed books then the unborrowed books to the return array
  result.push(borrowedBooks);
  result.push(unborrowedBooks);
  return result;
}

// function for everyone who has borrowed a book
//takes in a book and accounts 
// returns array of up to the 10 most recent borrower account with formatting
  /*
 {
      id: "5f446f2e4eff1030e7316861",
      returned: true,
      picture: "https://api.adorable.io/avatars/75/barber.waters@kegular.biz",
      age: 37,
      name: {
        first: "Barber",
        last: "Waters",
      },
      company: "KEGULAR",
      email: "barber.waters@kegular.biz",
      registered: "Tuesday, April 14, 2020 9:15 PM",
    },
  */
function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];
  borrows.forEach(borrow => {
    if (result.length >= 10) return;

    const borrower = accounts.find(account => account.id === borrow.id);
    const formattedBorrow = {
      ...borrow,
      ...borrower,
    };
    result.push(formattedBorrow);
  });
  console.log(result);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
