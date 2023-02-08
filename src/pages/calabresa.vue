<script>
import { ref, watch } from "vue";
import { menuStore, carrinhoStore } from "../store/produtos";
import { useToast } from "vue-toastification";
import router from "../router/index";
export default {
  setup() {
    const toast = useToast();

    const carrinho = carrinhoStore();

    const menu = menuStore();

    const calabresas = ref(menu.calabresa);

    const pedidoTemp = ref([]);

    watch(pedidoTemp, (novoValor, antigoValor) => {
      carrinho.pedidosParaSomar = novoValor;
    });

    function limparDados() {
      this.pedidoTemp = [];
      router.push("/");
    }

    function salvar() {
      if (this.pedidoTemp.length > 0) {
        carrinho.salvarPedido(this.pedidoTemp);
        this.pedidoTemp = [];
        toast.success("🥓 Adicionado com sucesso!", {
          timeout: 2000,
          position: "top-right",
          icon: false,
          showCloseButtonOnHover: true,
        });
        router.push("/");
      } else {
        toast.info("🍽 Nenhum item selecionado!", {
          timeout: 2000,
          position: "top-right",
          icon: false,
          showCloseButtonOnHover: true,
        });
      }
    }
    return {
      limparDados,
      salvar,
      pedidoTemp,
      calabresas,
    };
  },
};
</script>

<template>
  <div id="cardapio">
    <div id="listar">
      <div class="Categoria">
        <!---------------------------->
        <strong id="categoria">ESCOLHA SUA CALABRESA:</strong>
        <div v-for="(item, index) in calabresas" :key="item">
          <label class="container-checkbox" id="textoPreco">
            <input
              type="checkbox"
              class="checkbox1"
              id="adicional"
              :value="item"
              v-model="pedidoTemp"
            />
            <span class="checkmark"></span>
          </label>
          <label style="pointer-events: none" for="adicional">{{
            item.nome
          }}</label>
          <label id="preco">R$: {{ item.preco.toFixed(2) }}</label>
          <p id="itens"></p>
          <br />
        </div>
      </div>

      <button id="butOpcoes" @click="salvar()" type="submit" value="Submit">
        concluir
      </button>

      <button
        id="butOpcoes2"
        @click="limparDados()"
        type="submit"
        value="Submit"
      >
        voltar
      </button>
    </div>
  </div>
</template>
