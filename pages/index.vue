<template>
  <div class="h-screen flex flex-col font-serif">
    <div class="bg-red px-8 flex items-center" style="flex-basis: 63px;">
      <h1 class="text-white font-medium text-5xl">War!</h1>
    </div>
    <div class="flex bg-blue flex-1">
      <div class="container flex flex-col mt-64">
        <div class="flex justify-between items-center mb-5">
          <p class="text-white text-xl font-semibold tracking-widest">
            Player cards: {{ playerCards }}
          </p>
          <p class="text-white text-2xl font-semibold tracking-widest">
            Computer Wins!
          </p>
          <p class="text-white text-xl font-semibold tracking-widest">
            Computer cards: {{ computerCards }}
          </p>
        </div>
        <div class="flex justify-between items-center mb-24">
          <img
            v-if="!isGameStart"
            class="card"
            src="@/assets/images/cardback.jpg"
          />
          <img
            v-else
            class="card"
            :src="`${playerActiveCard && playerActiveCard.image}`"
          />
          <p class="flex flex-col">
            <button @click="deal" class="btn">deal</button>
            <button v-if="isGameStart" @click="newGame" class="btn">
              new game
            </button>
          </p>
          <img
            v-if="!isGameStart"
            class="card"
            src="@/assets/images/cardback.jpg"
          />
          <img
            v-else
            class="card"
            :src="`${computerActiveCard && computerActiveCard.image}`"
          />
        </div>
        <p
          class="text-base mx-auto text-grey font-sans text-center tracking-widest"
          style="max-width: 14rem;"
        >
          © {{ new Date().getFullYear() }} by Nitzan L. LLC. All rights
          reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getNewDeckId();
  },
  data() {
    return {
      deckId: "",
      isGameStart: false,

      playerCards: 26,
      playerActiveCard: null,
      playerActiveCardImage: "@/assets/images/cardback.jpg",

      computerCards: 26,
      computerActiveCard: null,
      computerActiveCardImage: "@/assets/images/cardback.jpg"
    };
  },
  methods: {
    async deal() {
      this.isGameStart = true;

      const {
        data: { cards }
      } = await this.$axios.get(
        `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=2`
      );

      [this.playerActiveCard, this.computerActiveCard] = cards;

      console.log(this.playerActiveCard);
      console.log(this.computerActiveCard);
    },
    newGame() {
      this.isGameStart = false;

      this.playerCards = 26;
      this.playerActiveCard = null;
      this.playerActiveCardImage = "@/assets/images/cardback.jpg";

      this.computerCards = 26;
      this.computerActiveCard = null;
      this.computerActiveCardImage = "@/assets/images/cardback.jpg";

      this.getNewDeckId();
    },
    async getNewDeckId() {
      const {
        data: { deck_id }
      } = await this.$axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );

      this.deckId = deck_id;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  @apply rounded-lg;
  box-shadow: 3px 3px 3px #222;
  max-width: 13rem;
}

.btn {
  @apply text-grey-100 font-medium bg-grey-200 text-2xl cursor-pointer uppercase border border-0 my-3 py-3 w-40;

  box-shadow: 3px 3px 3px #222;
  font-family: Lato;

  &:hover {
    @apply bg-grey-300;
  }
}
</style>
