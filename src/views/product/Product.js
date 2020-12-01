import React, { Component } from "react";
import { connect } from "react-redux";
import { getProducts } from "../../store/actions/productsActions";

class products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { products } = this.props.products;
    console.log(products);

    return (
      <div>
        {products.map((u) => (
          <React.Fragment key={u.id}>
            <h6>{u.name}</h6>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ products: state.products });

export default connect(mapStateToProps, { getProducts })(products);
