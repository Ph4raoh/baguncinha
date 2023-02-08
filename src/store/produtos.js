import { defineStore } from "pinia";

export const carrinhoStore = defineStore("carrinho", {
  state: () => {
    return {
      pedidos: [],
      valorDosPedidos: 0,
      pedidosParaSomar: [],
      pedidosFormatados: [],
      dadosPessoais: {
        nome: "",
        rua: "",
        bairro: "",
        numero: "",
        referencia: "",
        formaDeEntrega: "",
        formaDePagamento: "",
      },
    };
  },
  actions: {
    excluirItem(pedidoSelecionado) {
      for (let index in this.pedidos) {
        for (let item in this.pedidos[index]) {
          if (this.pedidos[index][item] == pedidoSelecionado) {
            if (this.pedidos[index][item].id == 4) {
              let valorDosPedidosTemp = this.pedidos[index].reduce(
                (sum, { preco }) => sum + preco,
                0
              );
              this.pedidos.splice(index, 1);
              this.valorDosPedidos -= valorDosPedidosTemp;

              break;
            } else {
              this.pedidos[index].splice(item, 1);
              this.valorDosPedidos -= pedidoSelecionado.preco;
              break;
            }
          }
        }
      }

      this.pedidos = this.pedidos.filter(function (e) {
        return e.length;
      });
    },
    salvarPedido(pedido) {
      this.pedidos.push(pedido);

      var juntos = this.pedidos.flat();

      let valorDosPedidosTemp = juntos.reduce(
        (sum, { preco }) => sum + preco,
        0
      );

      this.valorDosPedidos = valorDosPedidosTemp.toFixed(2);
    },
  },
  getters: {
    getPedidos() {
      return this.pedidos;
    },
    getDadosPessoais() {
      return this.dadosPessoais;
    },
    getValorDosPedidos() {
      let pedidosParaSomarTemp = this.pedidosParaSomar.reduce(
        (sum, { preco }) => sum + preco,
        0
      );

      return Math.abs(
        Number(this.valorDosPedidos) + Number(pedidosParaSomarTemp)
      ).toFixed(2);
    },
    getQuantidadeDePedidos() {
      let quantidadeDePedidos = this.pedidos.flat().length;
      let quantidadeTemp = 0;

      for (let index = 0; index < quantidadeDePedidos; index++) {
        if (this.pedidos.flat()[index].id != 5) {
          quantidadeTemp++;
        }
      }
      return quantidadeTemp;
    },
  },
});

export const produtosStore = defineStore("produto", {
  state: () => {
    return {
      cardDataStore: [
        {
          id: 1,
          nome: "HAMBÚRGUER",
          img: "food1.webp",
          descricao: "Tradicional",
          url: "/burger",
        },

        {
          id: 2,
          nome: "BATATA FRITA",
          img: "food2.webp",
          descricao: "Porções",
          url: "/batata",
        },
        {
          id: 3,
          nome: "COMBOS",
          img: "food4.webp",
          descricao: "Mais Vendidos",
          url: "/combo",
        },
        {
          id: 4,
          nome: "CALABRESA",
          img: "food3.webp",
          descricao: "Porções",
          url: "/calabresa",
        },
        {
          id: 5,
          nome: "BEBIDAS",
          img: "food5.webp",
          descricao: "Geladas",
          url: "/bebida",
        },
      ],
    };
  },
});

export const menuStore = defineStore("menu", {
  state: () => {
    return {
      burger: [
        {
          id: 1,
          nome: "X-TUDO",
          descricao:
            "HAMBURGUER, CALABRESA, BACON, FRANGO, SALSICHA, OVO, QUEIJO, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
        {
          id: 1,
          nome: "X-BAGUNCINHA",
          descricao:
            "HAMBURGUER, CALABRESA, SALSICHA, OVO, QUEIJO, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
        {
          id: 1,
          nome: "X BACON",
          descricao:
            "HAMBURGUER, 2 BACON, SALSICHA, OVO, QUEIJO, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
        {
          id: 1,
          nome: "X-CALABRESA",
          descricao:
            "2X CALABRESA, SALSICHA, OVO, QUEIJO, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
        {
          id: 1,
          nome: "X-SALADA",
          descricao:
            "HAMBURGUER, SALSICHA, OVO, QUEIJO, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
        {
          id: 1,
          nome: "X-FILE",
          descricao:
            "HAMBURGUER, 2 FILE, SALSICHA, OVO, QUEIJO, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
        {
          id: 1,
          nome: "CACHORRO QUENTE",
          descricao:
            "3X SALSICHA, BATATA PALHA, QUEIJO, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
        {
          id: 1,
          nome: "CACHORRO QUENTE C/ BACON",
          descricao:
            "3X SALSICHA, BATATA PALHA, QUEIJO, BACON, ALFACE, TOMATE, MILHO E MAIONESE",
          preco: 33.99,
        },
      ],
      combo: [
        {
          id: 2,
          nome: "1X-SALADA",
          descricao: "+BATATA P+GUARANA 269ML",
          preco: 33.99,
        },
        {
          id: 2,
          nome: "1X-BAGUNCINHA",
          descricao: "+BATATA P+GUARANA 269ML",
          preco: 36.99,
        },
        {
          id: 2,
          nome: "1X-TUDO",
          descricao: "+BATATA P+ GUARANA 269ML",
          preco: 45.99,
        },
        {
          id: 2,
          nome: "2 X-BAGUNCINHA",
          descricao: "+BATATA FRITA COM CHEDDAR E BACON MEDIA",
          preco: 79.99,
        },
        {
          id: 2,
          nome: "2 X-BAGUNCINHA",
          descricao: "+SUCO NATURAL DE LARANJA JARRA",
          preco: 67.99,
        },
        {
          id: 2,
          nome: "2X-BAGUNCINHA",
          descricao: "+2 BATATAS P + 1 KITUBAINA 1,5L",
          preco: 73.99,
        },
        {
          id: 2,
          nome: "2X-BAGUNCINHA",
          descricao: "+BATATA FRITA CHEDDAR E BACON MEDIA COCA-COLA 1,5L",
          preco: 82.99,
        },
        {
          id: 2,
          nome: "3X-BAGUNCINHA",
          descricao: "+KITUBAINA 1,5L",
          preco: 83.99,
        },
        {
          id: 2,
          nome: "3X-SALADA",
          descricao: "+KITUBAINA 1,5L",
          preco: 74.99,
        },
      ],
      calabresa: [
        {
          id: 3,
          nome: "CALABRESA MEDIA",
          preco: 29.99,
        },
        {
          id: 3,
          nome: "CALABRESA GRANDE",
          preco: 36.99,
        },
        {
          id: 3,
          nome: "CALABRESA COM BATATA",
          preco: 33.99,
        },
      ],
      batata: [
        {
          id: 4,
          nome: "BATATA P INDIVIDUAL",
          descricao: "",
          preco: 8.99,
        },
        {
          id: 4,
          nome: "BATATA MEDIA",
          descricao: "",
          preco: 18.99,
        },
        {
          id: 4,
          nome: "BATATA GRANDE",
          descricao: "",
          preco: 22.99,
        },
        {
          id: 4,
          nome: "BATATA MEDIA CHEDDAR E BACON ",
          descricao: "",
          preco: 26.99,
        },
        {
          id: 4,
          nome: "BATATA GRANDE CHEDDAR E BACON",
          descricao: "",
          preco: 32.99,
        },
        {
          id: 4,
          nome: "BATATA MEDIA QUEIJO E BACON",
          descricao: "",
          preco: 27.99,
        },
        {
          id: 4,
          nome: "BATATA GRANDE QUEIJO E BACON",
          descricao: "",
          preco: 34.99,
        },
      ],
      adicionais: [
        {
          id: 5,
          nome: "MUSSARELA",
          preco: 5.0,
        },
        {
          id: 5,
          nome: "CHEDDAR",
          preco: 3.0,
        },
        {
          id: 5,
          nome: "CALABRESA",
          preco: 5.0,
        },
        {
          id: 5,
          nome: "BACON",
          preco: 6.0,
        },
      ],
      bebida: [
        {
          id: 6,
          nome: "ÁGUA SEM GÁS",
          preco: 9.0,
        },
        {
          id: 6,
          nome: "ÁGUA COM GÁS",
          preco: 9.0,
        },
        {
          id: 6,
          nome: "COCA-COLA (1,5L)",
          preco: 9.0,
        },
        {
          id: 6,
          nome: "KITUBAINA (1,5L)",
          preco: 9.0,
        },
        {
          id: 6,
          nome: "FANTA LARANJA (1,5L)",
          preco: 9.0,
        },
        {
          id: 6,
          nome: "FANTA UVA (1,5L)",
          preco: 9.0,
        },
        {
          id: 6,
          nome: "COCA-COLA LATA",
          preco: 5.0,
        },
        {
          id: 6,
          nome: "FANTA UVA LATA",
          preco: 5.0,
        },
        {
          id: 6,
          nome: "COCA-COLA ZERO LATA",
          preco: 5.0,
        },
        {
          id: 6,
          nome: "FANTA LARANJA LATA",
          preco: 5.0,
        },
        {
          id: 6,
          nome: "SPRITE LATA",
          preco: 5.0,
        },
        {
          id: 6,
          nome: "GUARANÁ ANTARTICA LATA",
          preco: 5.0,
        },
        {
          id: 6,
          nome: "COPO ABACAXI C/HORTELAN",
          preco: 5.0,
        },
        {
          id: 6,
          nome: "COPO ABACAXI",
          preco: 8.99,
        },
        {
          id: 6,
          nome: "COPO ACEROLA",
          preco: 8.99,
        },
        {
          id: 6,
          nome: "COPO MARACUJA",
          preco: 8.99,
        },
        {
          id: 6,
          nome: "COPO LARANJA NATURAL",
          preco: 8.99,
        },
        {
          id: 6,
          nome: "JARRA ABACAXI C/HORTELAN",
          preco: 14.99,
        },
        {
          id: 6,
          nome: "JARRA ABACAXI",
          preco: 14.99,
        },
        {
          id: 6,
          nome: "JARRA ACEROLA",
          preco: 14.99,
        },
        {
          id: 6,
          nome: "JARRA MARACUJA",
          preco: 14.99,
        },
        {
          id: 6,
          nome: "JARRA LARANJA NATURAL",
          preco: 17.99,
        },
      ],
    };
  },
});
