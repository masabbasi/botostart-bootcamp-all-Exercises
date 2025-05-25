import { useApp } from "../context/AppProvider.js";

function ProductItem({ product }) {
  const { dispatch } = useApp();

  const editHandler = (product) => {
    dispatch({ type: "CHANGE_EDIT" });
    dispatch({ type: "SELECT_PRODUCT", payload: product.id });
    dispatch({ type: "EDIT_PRODUCT", payload: product });
  };

  const deleteHandler = (id) => {
    dispatch({ type: "CHANGE_CONFIRM" });
    dispatch({ type: "SELECT_PRODUCT", payload: id });
  };

  return (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.quantity}</td>
      <td>{product.price}</td>
      <td>{product.id}</td>
      <td>
        <img src="/img/edit.svg" alt="" onClick={() => editHandler(product)} />
        <img
          src="/img/delete.svg"
          alt=""
          onClick={() => deleteHandler(product.id)}
        />
      </td>
    </tr>
  );
}

export default ProductItem;
