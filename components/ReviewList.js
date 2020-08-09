app.component('review-list', {
  template: `
    <div class="review-container">
      <h3>Reviews: </h3>
      <ul>
        <li v-for="(review, index) in reviews" :key="index">
          {{ review.name }} gave this {{ review.rating }} stars
          <br/>
          "{{ review.review }}"
        </li>
      </ul>
    </div>
  `,

  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
})