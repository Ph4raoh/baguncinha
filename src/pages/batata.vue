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

    const batatas = ref(menu.batata);
    const adicionais = ref(menu.adicionais);

    const pedidoTemp = ref();
    const adicinalTemp = ref([]);

    watch(pedidoTemp, (novoValor, antigoValor) => {
      let pedidosTemp = [];

      if (adicinalTemp.value.length > 0) {
        for (let x = 0; x < adicinalTemp.value.length; x++) {
          pedidosTemp.push(adicinalTemp.value[x]);
        }
      }

      pedidosTemp.push(pedidoTemp.value);

      carrinho.pedidosParaSomar = pedidosTemp;
    });

    watch(adicinalTemp, (novoValor, antigoValor) => {
      let pedidosTemp = [];

      for (let x = 0; x < novoValor.length; x++) {
        pedidosTemp.push(novoValor[x]);
      }

      if (pedidoTemp.value != undefined) {
        pedidosTemp.push(pedidoTemp.value);
      }

      carrinho.pedidosParaSomar = pedidosTemp;
    });

    function limparDados() {
      if (this.pedidoTemp != undefined) {
      }
      this.pedidoTemp.preco = 0;

      this.adicinalTemp = [];

      router.push("/");
    }

    function salvar() {
      if (this.pedidoTemp != undefined) {
        let pedidosJuntos = [];

        pedidosJuntos.push(this.pedidoTemp);

        for (let x = 0; x < adicinalTemp.value.length; x++) {
          pedidosJuntos.push(adicinalTemp.value[x]);
        }

        carrinho.salvarPedido(pedidosJuntos.flat());

        carrinho.pedidosParaSomar = [];

        toast.success("🍟 Adicionado com sucesso!", {
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
      batatas,
      adicionais,
      adicinalTemp,
    };
  },
};
</script>

<template>
  <div id="cardapio">
    <div id="listar">
      <div class="Categoria">
        <!---------------------------->
        <strong id="categoria">ESCOLHA SUA BATATA:</strong>
        <div v-for="(item, index) in batatas" :key="item">
          <div id="tituloRadio">
            <input type="radio" :value="item" v-model="pedidoTemp" />
            <label id="tituloDoRadio">{{ item.nome }}</label>
          </div>
          <label id="preco">R$: {{ item.preco.toFixed(2) }}</label>
          <p id="itens"></p>
          <br />
        </div>
        <!---------------------------->
        <strong id="categoria">ADICIONAIS:</strong>
        <div v-for="(item, index) in adicionais" :key="item">
          <label class="container-checkbox" id="textoPreco">
            <input
              type="checkbox"
              class="checkbox1"
              id="adicional"
              :value="item"
              v-model="adicinalTemp"
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

<style>
#tituloRadio {
  display: flex;
  align-items: center;
}

#tituloDoRadio {
  margin-left: 3px;
}

input[type="radio"] {
  margin-left: -3px;
  border: 0px;
  width: 30px;
  height: 2em;
  accent-color: #f27141;
}
</style>
