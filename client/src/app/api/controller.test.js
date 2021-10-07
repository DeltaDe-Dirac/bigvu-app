import { act } from "react-dom/test-utils";
import { fetchMessage } from "./controller";

beforeEach(() => {
  const fakeData = {
    message: "mocked message from server",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );
});

afterEach(() => {
  global.fetch.mockRestore();
});

it("fetchMessage", async () => {
  await act(async () => {
    fetchMessage("anyURL").then((data) => expect(data).toEqual("mocked message from server"));
  });
  expect(fetch).toHaveBeenCalledTimes(1);
});
/*--------------------------------------------*/

it("error on fetchMessage", async () => {
  const url = "/anyURL";
  const fakeData = {
    message: `error querying server at: ${url}`,
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.reject(fakeData),
    })
  );
  await act(async () => {
    fetchMessage(url).then((data) => expect(data).toEqual(`error querying server at: ${url}`));
  });
  expect(fetch).toHaveBeenCalledTimes(1);
});
