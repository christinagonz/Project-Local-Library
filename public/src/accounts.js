const { findAuthorById } = require("./books");

// function for finding account with id 
// takes in account array and id 
// returns account for id 
function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

// function sorting alphabetically 
//takes in accounts array
// returns sorted array
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
}

// function counting how many times a user has borrowed books 
//takes in account and books
// returns total number of books borrowed
function getTotalNumberOfBorrows(account, books) {
  let count = 0;
  books.forEach(book => {
    const borrowedById = borrowsById(book, account);
    count += borrowedById.length;
  });
  return count;
}

// function finding all books borrowed by an account 
// takes in account, book array, author array
// returns formatted book object
function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
  const result = [];
  borrowedBooks.forEach(book => {
    const bookAuthor = findAuthorById(authors, book.authorId);
    result.push({
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: book.authorId,
      author: bookAuthor,
      borrows: book.borrows,
    });
  });
  return result;
}

// HELPER FUNCTION

// fuction looking up single book borrowed by account
// takes in book, id
// returns a list of borrows by the provided account id
function borrowsById (book, {id}) {
  return book.borrows.filter(borrow => borrow.id === id);
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
