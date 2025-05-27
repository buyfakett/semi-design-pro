export interface AddBookParams {
  title: string;
  author: string;
  year: number;
  summary?: string;
}

export interface AddBookResp {
  code: number;
  msg: string;
}

export interface DeleteBookParams {
  book_id: string;
}

export interface DeleteBookResp {
  code: number;
  msg: string;
}

export interface ListBooksParams {
  page?: number;
  page_size?: number;
  title?: string;
  author?: string;
}

export interface BookItem {
  book_id: string;
  title: string;
  author: string;
  summary: string;
}

export interface ListBooksResp {
  code: number;
  msg: string;
  total: number;
  data: BookItem[];
}

export interface UpdateBookParams {
  book_id: string;
  title: string;
  author: string;
  year: number;
  summary: string;
}

export interface UpdateBookResp {
  code: number;
  msg: string;
}
