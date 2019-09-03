import request from '@/utils/request'

export function uploadOne(query) {
  return request({
    url: '/uploadOne',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: query
  })
}
