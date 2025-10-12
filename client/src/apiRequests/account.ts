import http from '@/lib/http'
import {
  AccountListResType,
  AccountResType,
  ChangePasswordBodyType,
  CreateEmployeeAccountBodyType,
  CreateGuestBodyType,
  CreateGuestResType,
  GetGuestListQueryParamsType,
  GetListGuestsResType,
  UpdateEmployeeAccountBodyType,
  UpdateMeBodyType,
} from '@/schemas/account.schema'
import queryString from 'query-string'

const PREFIX_ACCOUNT = '/accounts'

const accountApi = {
  getMe: () => http.get<AccountResType>(`${PREFIX_ACCOUNT}/me`),

  sGetMe: (accessToken: string) =>
    http.get<AccountResType>(`${PREFIX_ACCOUNT}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  updateMe: (body: UpdateMeBodyType) => http.put<AccountResType>(`${PREFIX_ACCOUNT}/me`, body),

  changePassword: (body: ChangePasswordBodyType) => http.put<AccountResType>(`${PREFIX_ACCOUNT}/change-password`, body),

  getListAccount: () => http.get<AccountListResType>(`${PREFIX_ACCOUNT}`),

  createEmployee: (body: CreateEmployeeAccountBodyType) => http.post<AccountResType>(PREFIX_ACCOUNT, body),

  updateEmployee: (id: number, body: UpdateEmployeeAccountBodyType) =>
    http.put<AccountResType>(`${PREFIX_ACCOUNT}/detail/${id}`, body),

  getEmployeeDetail: (id: number) => http.get<AccountResType>(`${PREFIX_ACCOUNT}/detail/${id}`),

  deleteEmployee: (id: number) => http.delete<AccountResType>(`${PREFIX_ACCOUNT}/detail/${id}`),

  guestList: (queryParams: GetGuestListQueryParamsType) =>
    http.get<GetListGuestsResType>(
      `${PREFIX_ACCOUNT}/guests?${new URLSearchParams({
        fromDate: queryParams.fromDate ? queryParams.fromDate.toISOString() : '',
        toDate: queryParams.toDate ? queryParams.toDate.toISOString() : '',
      })}`,
    ),

  // guestList1: (queryParams: GetGuestListQueryParamsType) =>
  //   http.get<AccountListResType>(
  //     `${PREFIX_ACCOUNT}/guests?` +
  //       queryString.stringify({
  //         fromDate: queryParams.fromDate?.toISOString(),
  //         toDate: queryParams.toDate?.toISOString(),
  //       }),
  //   ),

  createGuest: (body: CreateGuestBodyType) => http.post<CreateGuestResType>(`${PREFIX_ACCOUNT}/guests`, body),
}

export default accountApi
