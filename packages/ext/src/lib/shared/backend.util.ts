import type { ServerItemConfig } from '$lib/options/type';
import { request } from '$lib/shared/http.util';

type Server = Pick<ServerItemConfig, 'apiBase' | 'pat'>;

function genAuthHeader(server: Server) {
  return {
    ...(server && server.pat ? { Authorization: `Bearer ${server.pat}` } : undefined),
  };
}

export function fetchUserFromServer(server: Server) {
  return request({ url: server.apiBase + '/api/user/v1', headers: genAuthHeader(server) });
}

export function unused_fetchBookmark(server: Server, bookmarkId: number) {
  return request({
    url: server.apiBase + '/api/bookmarks/' + bookmarkId,
    method: 'GET',
    headers: genAuthHeader(server),
  });
}

export function saveBookmarkToServer(server: Server, data: any) {
  return request({
    url: server.apiBase + '/api/bookmarks',
    method: 'POST',
    data,
    headers: genAuthHeader(server),
  });
}

export function deleteBookmarkServerSide(server: Server, bookmarkId: number) {
  return request({
    url: server.apiBase + '/api/bookmarks/' + bookmarkId,
    method: 'DELETE',
    headers: genAuthHeader(server),
  });
}
