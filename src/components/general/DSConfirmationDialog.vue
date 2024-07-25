<template>
  <q-dialog v-model="confirm" @hide="dialogClosed">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="question_mark" color="primary" text-color="white" />
        <span class="q-ml-sm">{{ pMessage }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Yes" color="primary" @click="yesActionPerformed" />
        <q-btn flat label="No" color="primary" @click="noActionMethod" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    pConfirm: {
      type: Boolean,
      required: true,
    },
    pMessage: {
      type: String,
      required: true,
    },
    pYesActionMethod: {
      type: Function,
      required: true,
    },
    pNoActionMethod: {
      type: Function,
      required: false,
      default: function () {
        return null;
      }
    }
  },
  emits: ['noActionPreformed', 'dialogHidden'],
  data() {
    return {
      confirm: false,
    }
  },
  watch: {
    pConfirm(newValue) {
      this.confirm = newValue;
    }
  },
  methods: {
    yesActionPerformed() {
      this.pYesActionMethod();
      this.confirm = false;
    },
    noActionMethod() {
      if (this.pNoActionMethod === null) {
        this.$emit("noActionPreformed");
        return;
      }
      this.pNoActionMethod();
      this.confirm = false;
    },
    dialogClosed() {
      this.$emit("dialogHidden");
    }
  }
}
</script>
