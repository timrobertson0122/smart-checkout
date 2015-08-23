describe('factory: Products', function() {

  var products;

  beforeEach(function(){
    module('ClothesShop');
  });

  beforeEach(inject(function(Products) {
    products = Products
    sampleItemShoes = {name: "Suede Shoes, Blue", price: 42.00, quantity: 4, category: "Womens Footwear"};
    sampleItemNotShoes = {name: "Cotton Shorts, Medium Red", price: 30.00, quantity: 5, category: "Womens Casual"};
  }));

  describe('shopping basket', function() {

    it('is empty upon initialisation', function() {
      expect(products.shoppingBasket).toEqual([]);
    });

    it('has a total of zero upon initialisation', function() {
      expect(products.basketTotal).toEqual(0);
    });

    it('can add a product to the shopping basket', function() {
      products.addItemToBasket(sampleItemShoes);
      expect(products.shoppingBasket).toEqual([sampleItemShoes]);
    });

    it('can add multiple items to the shopping basket', function() {
      products.addItemToBasket(sampleItemShoes);
      products.addItemToBasket(sampleItemNotShoes);
      expect(products.shoppingBasket).toEqual([sampleItemShoes, sampleItemNotShoes]);
    });

    it('can remove a product from the shopping basket', function() {
      products.addItemToBasket(sampleItemShoes);
      products.removeItemFromBasket(sampleItemShoes);
      expect(products.shoppingBasket).toEqual([]);
    });

    it('can remove a product from the shopping basket one at a time', function() {
      products.addItemToBasket(sampleItemShoes);
      products.addItemToBasket(sampleItemShoes);
      products.removeItemFromBasket(sampleItemShoes);
      expect(products.shoppingBasket).toEqual([sampleItemShoes]);
    });

    it('can empty the shopping basket of all products', function() {
      products.addItemToBasket(sampleItemShoes);
      products.addItemToBasket(sampleItemShoes);
      products.emptyBasket();
      expect(products.shoppingBasket).toEqual([]);
    })

    it('knows the total cost of the products in the shopping basket', function() {
      products.addItemToBasket(sampleItemShoes);
      products.addItemToBasket(sampleItemNotShoes);
      expect(products.basketTotal).toEqual(72.00);
    });

    it('adding a product to the shopping basket reduces that products quantity by one', function() {
      expect(sampleItemShoes.quantity).toEqual(4);
      products.addItemToBasket(sampleItemShoes);
      expect(sampleItemShoes.quantity).toEqual(3);
    });

    it('wont add a product to the shopping basket when its available quantity is less than one', function() {
      for (var i = 5; i >= 0; i--) {
        products.addItemToBasket(sampleItemShoes);
      };
      expect(products.shoppingBasket.length).toEqual(4);
    });
  });
  
  describe('vouchers', function() {

    it('can apply a £5 voucher to any order', function() {
      products.addItemToBasket(sampleItemShoes);
      products.applyVoucher(5);
      expect(products.basketTotal).toEqual(37);
    });
    
  })
});