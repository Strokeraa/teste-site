from requests import Session
from requests.auth import HTTPBasicAuth
from zeep import Client, Transport
from zeep.helpers import serialize_object
from decimal import Decimal
import json
 
# URL do WSDL
wsdl = 'http://ciqas08.appcom.org:8008/sap/bc/soap/wsdl11?services=BAPI_QUALNOT_GETDETAIL&sap-client=600'
 
# Configurando a sessão com autenticação
session = Session()
session.auth = HTTPBasicAuth('lgopereira', 'Sabo@2024')  # Substitua pelas suas credenciais
 
# Configurando o transporte com a sessão autenticada
transport = Transport(session=session)
 
# Criando o cliente
client = Client(wsdl=wsdl, transport=transport)
 
# Função personalizada para converter objetos Decimal
def custom_converter(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f'Tipo não serializável: {type(obj)}')
 
def obter_dados_rnc(numero_rnc):
    try:
        # Chamando a BAPI
        response = client.service.BAPI_QUALNOT_GETDETAIL(
            NUMBER="000" + numero_rnc,
            NOTIFACTV={},
            NOTITEM={},
            NOTIFCAUS={},
            NOTIFPARTNR={},
            NOTIFTASK={},
            NOTLONGTXT={},
            RETURN={}
        )
 
        # Convertendo a resposta
        response_dict = serialize_object(response)
 
        # Extraindo as informações necessárias (adapte conforme seus requisitos)
        data = {
            "fornecedor": response_dict['NOTIFHDTEXT']['VENDOR_NAME'],
            "material": response_dict['NOTIFHDTEXT']['MATL_DESC'],
            "no": response_dict['NOTIFHEADER_EXPORT']['NOTIF_NO'],
            "descricao_problema": response_dict['NOTIFHEADER_EXPORT']['SHORT_TEXT'],
            "data": response_dict['NOTIFHEADER_EXPORT']['NOTIF_DATE'],
            "codigo": response_dict['NOTIFHEADER_EXPORT']['MATERIAL'],
            "quantidade_interditada": response_dict['NOTIFHEADER_EXPORT']['QUANT_COMPLAINT'],
            "contato": response_dict['NOTIFPARTNR']['item'][1]['PARTNER'] + "@sabo.com.br"
        }
 
        # Salvando os valores em um arquivo JSON
        with open('valores.txt', 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, default=custom_converter)
 
        print("Valores salvos em valores.txt")
 
    except Exception as e:
        print(f"Erro ao chamar o serviço: {e}")
 
if __name__ == '__main__':
    numero_rnc = input("Digite o número da RNC: ")
    obter_dados_rnc(numero_rnc)
 