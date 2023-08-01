import {FilterBoxContainer, FilterItem} from "./styles"
import { ArrowArcLeft, Heart, ShoppingCart, Storefront, UserCircle } from 'phosphor-react';

export const FilterBox = () => {
  return (
    <>

    <FilterBoxContainer>
  
      <FilterItem>
        <ArrowArcLeft size={18} />
        Listing
      </FilterItem>
      <FilterItem>
        <Heart size={18} />
        Like
      </FilterItem>
      <FilterItem>
        <ShoppingCart size={18} />
        Purchase
      </FilterItem>
      <FilterItem>
        <Storefront size={18} />
        Sales
      </FilterItem>
      <FilterItem>
        <UserCircle size={18} />
        Transfer
      </FilterItem>
    </FilterBoxContainer>
    </>
  );
};

export default FilterBox;
