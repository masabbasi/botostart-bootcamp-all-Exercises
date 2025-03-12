// const BASIC_URL = "";
async function getData() {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new TypeError(error.message + " (check URL)");
  }
}

export default getData;
