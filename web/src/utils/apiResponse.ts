export function extractListData<T>(response: { data: unknown }): T[] {
  const body = response.data;

  if (Array.isArray(body)) {
    return body as T[];
  }

  if (body && typeof body === 'object' && 'data' in body) {
    const nested = (body as { data?: unknown }).data;
    if (Array.isArray(nested)) {
      return nested as T[];
    }
  }

  return [];
}

export function extractEntityData<T>(response: { data: unknown }): T {
  const body = response.data;

  if (body && typeof body === 'object' && 'data' in body) {
    return (body as { data: T }).data;
  }

  return body as T;
}
