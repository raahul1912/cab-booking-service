import { Request, Response } from 'express';

declare namespace App {
  /**
   * Custom request that includes all the types of express Request Object
   */
  interface CustomRequest extends Request {
    tokenData?: DataStoredInToken;
  }

  /**
   * Custom response that includes all the types of express Response Object
   */
  interface CustomResponse extends Response {
    body?: any;
  }

  /**
   * Order by object type
   */
  interface Order {
    orderBy: any;
    sortField: string;
  }

  /**
   * Pager
   */
  interface Pager {
    sortField: string;
    sortOrder: string;
    rowNumber: number;
    recordsPerPage: number;
    filteredRecords: number;
    totalRecords: number;
  }

  /**
   * Token Type
   */
  interface DataStoredInToken {
    user_id: number;
    email: string;
    user_name: string;
  }
}

export = App;
