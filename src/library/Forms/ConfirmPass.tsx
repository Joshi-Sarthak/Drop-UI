const Form6 = `
<form class="space-y-4 max-w-md">
  <input type="text" placeholder="Name (optional)" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"/>
  <textarea rows="4" placeholder="Share your feedback..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 resize-none"></textarea>
  <label class="flex items-center space-x-2 text-sm text-gray-700">
    <input type="checkbox" class="text-red-600 focus:ring-red-500" />
    <span>I consent to be contacted</span>
  </label>
  <button type="submit" class="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Submit Feedback</button>
</form>
`
export default Form6
