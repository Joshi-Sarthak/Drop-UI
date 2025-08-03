const Form4 = `
<form class="space-y-4 max-w-lg">
  <input type="text" placeholder="Full Name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
  <input type="email" placeholder="Email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
  <input type="number" placeholder="Quantity" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"/>
  <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
    <option disabled selected>Select Product</option>
    <option>Product A</option>
    <option>Product B</option>
    <option>Product C</option>
  </select>
  <button type="submit" class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">Place Order</button>
</form>
`
export default Form4
