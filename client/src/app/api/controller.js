export async function fetchMessage(url) {
  const response = await fetch(url);
  let data = null;

  try {
    data = await response.json();
  } catch (e) {
    console.error(e);
    data = { message: `error querying server at: ${url}` };
  }
  return data.message;
}
