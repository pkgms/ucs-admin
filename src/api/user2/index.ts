import Http from '@/api/http';

/**
 * 用户列表
 * @param {*} query
 */
export const userLists = (query: any) => {
  return Http({
    url: '/user/list',
    method: 'get',
    params: query,
  })
}

// 用户列表
export const userList = {
  name: 'user.index',
  url: '/user/list',
  method: 'get',
}

/**
 * 用户添加
 * @param query
 */
export const userStore = (query: any) => {
  return Http({
    url: `/user/store`,
    method: 'post',
    params: query,
  });
};

/**
 * 用户编辑
 * @param query
 */
export const userUpdate = (query: any) => {
  return Http({
    url: `/user/modify`,
    method: 'post',
    params: query,
  });
};

/**
 * 用户查询
 * @param query
 */
export const userInfo = (query: any) => {
  return Http({
    url: `/user/modify`,
    method: 'post',
    params: query,
  });
};
