import { Response } from 'express';
import STATUS_CODES from 'http-status-codes';
import { Op } from 'sequelize';
import { CustomRequest, Order, Pager } from '../..';
import { RECORDS_PER_PAGE } from '../../utils/constants';
import { getDefaultSortOrder, response } from '../../utils/helper';
import { RideModel } from '../ride/models';

class UserController {
  /**
   * @description Cab Booking History
   * @param req
   * @param res
   */
  public async history(req: CustomRequest, res: Response) {
    try {
      let { search, rowNumber, recordsPerPage, sortOrder, sortBy, showAll } = req.body;
      const user_id = req.tokenData?.user_id;
      rowNumber = rowNumber ? +rowNumber : 1;
      recordsPerPage = recordsPerPage ? +recordsPerPage : RECORDS_PER_PAGE;

      // Set sort order
      sortOrder = getDefaultSortOrder(sortOrder);
      const { orderBy, sortField } = this.getOrder(sortBy, sortOrder);

      const other = {
        order: orderBy,
        offset: !showAll ? rowNumber - 1 : undefined,
        limit: !showAll ? recordsPerPage : undefined
      };

      let condition: any = [];
      // search filter
      if (search) {
        const filters = JSON.parse(search);
        condition = this.getFilters(filters);
      }
      condition.push({ user_id, status: 1 });
      // Get records
      const totalCount = !showAll ? await RideModel.getTotal(condition) : undefined;
      const list = await RideModel.getMany(condition, [], other);

      // If show all then pager will be empty
      const pager: Pager | {} = showAll
        ? {}
        : {
            sortField,
            sortOrder,
            rowNumber,
            recordsPerPage,
            filteredRecords: list.length,
            totalRecords: totalCount
          };

      response(res, STATUS_CODES.OK, 'Cab Booking History', list, pager);
    } catch (e) {
      console.error(`Error while fetching booking history ${e}`); // Log
      response(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Server Error');
    }
  }

  /**
   * @description Get order
   * @param sortBy
   * @param sortOrder
   */
  private getOrder(sortBy: string, sortOrder: string): Order {
    let orderBy,
      sortField = '';
    if (sortBy) {
      if (sortBy === 'fare') {
        orderBy = [['fare', sortOrder]];
        sortField = 'fare';
      }
    }
    return { orderBy, sortField };
  }

  /**
   * @description Get filters
   * @param filters
   */
  private getFilters(filters: any): object {
    let condition: any = [];
    for (var key in filters) {
      const data: any = filters[key];
      if (key === 'fare') {
        condition.push({
          name: { [Op.like]: `%${data}%` }
        });
      }
    }
    return condition;
  }
}

export default new UserController();
