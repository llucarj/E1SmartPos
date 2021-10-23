export default class SatXml{
    constructor(){
        this.xml = 
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<CFe>' +
            '<infCFe Id="CFe13190214200166000166599000162520038194198637" versao="0.07" versaoDadosEnt="0.07" versaoSB="010103">' +
                '<ide>' +
                    '<cUF>13</cUF>' +
                    '<cNF>419863</cNF>' +
                    '<mod>59</mod>' +
                    '<nserieSAT>900016252</nserieSAT>' +
                    '<nCFe>003819</nCFe>' +
                    '<dEmi>20190219</dEmi>' +
                    '<hEmi>085745</hEmi>' +
                    '<cDV>7</cDV>' +
                    '<tpAmb>2</tpAmb>' +
                    '<CNPJ>16716114000172</CNPJ>' +
                    '<signAC>SGR-SAT SISTEMA DE GESTAO E RETAGUARDA DO SAT</signAC>' +
                    '<assinaturaQRCODE>HevsYxSTzH4u2mOaGjwqnLccBTzGvPl1DHrEWSXC68J4/4AotP7d4NRTQTmNxkqDHWPbDPTtcba39FCHRQ7Lk+MBlwuS6V1qpyP7YYIP1ECDzBj3/nZZtk4SHdcV6jMLdHVjRmKUE/d2vSznNvJQf2lG5i5gOfdNbBn2vEjNFZdRMx2PE8ZTAelZCmQpgdnvTmq31UWUboR0xVqlZjzFYV4eBt+icdmqM7MtPQpJTAlQUtiKfzYbxGBQkOfmRtIcTMadqfFXmBDOmp49nw10hbwXF0YX5L5rjr7XjBiqK8zNQNHDn36QbW+gxJGsRucO4Rqq2q3SDq4gIDn0A3l14Q==</assinaturaQRCODE>' +
                    '<numeroCaixa>001</numeroCaixa>' +
                '</ide>' +
                '<emit>' +
                    '<CNPJ>14200166000166</CNPJ>' +
                    '<xNome>ELGIN INDUSTRIAL DA AMAZONIA LTDA</xNome>' +
                    '<enderEmit>' +
                        '<xLgr>AVENIDA ABIURANA</xLgr>' +
                        '<nro>579</nro>' +
                        '<xBairro>DIST INDUSTRIAL</xBairro>' +
                        '<xMun>MANAUS</xMun>' +
                        '<CEP>69075010</CEP>' +
                    '</enderEmit>' +
                    '<IE>111111111111</IE>' +
                    '<IM>111111</IM>' +
                    '<cRegTrib>3</cRegTrib>' +
                    '<indRatISSQN>N</indRatISSQN>' +
                '</emit>' +
                '<dest />' +
                '<det nItem="1">' +
                    '<prod>' +
                        '<cProd>1</cProd>' +
                        '<cEAN>0012345678905</cEAN>' +
                        '<xProd>NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</xProd>' +
                        '<NCM>30043929</NCM>' +
                        '<CFOP>5102</CFOP>' +
                        '<uCom>UN</uCom>' +
                        '<qCom>1.0000</qCom>' +
                        '<vUnCom>4.40</vUnCom>' +
                        '<vProd>4.40</vProd>' +
                        '<indRegra>A</indRegra>' +
                        '<vItem>4.40</vItem>' +
                    '</prod>' +
                    '<imposto>' +
                        '<vItem12741>2.00</vItem12741>' +
                        '<ICMS>' +
                            '<ICMSSN102>' +
                                '<Orig>0</Orig>' +
                                '<CSOSN>102</CSOSN>' +
                            '</ICMSSN102>' +
                        '</ICMS>' +
                        '<PIS>' +
                            '<PISAliq>' +
                                '<CST>01</CST>' +
                                '<vBC>4.40</vBC>' +
                                '<pPIS>0.0165</pPIS>' +
                                '<vPIS>0.07</vPIS>' +
                            '</PISAliq>' +
                        '</PIS>' +
                        '<COFINS>' +
                            '<COFINSAliq>' +
                                '<CST>01</CST>' +
                                '<vBC>4.40</vBC>' +
                                '<pCOFINS>0.0760</pCOFINS>' +
                                '<vCOFINS>0.33</vCOFINS>' +
                            '</COFINSAliq>' +
                        '</COFINS>' +
                    '</imposto>' +
                '</det>' +
                '<total>' +
                    '<ICMSTot>' +
                        '<vICMS>0.00</vICMS>' +
                        '<vProd>4.40</vProd>' +
                        '<vDesc>0.00</vDesc>' +
                        '<vPIS>0.07</vPIS>' +
                        '<vCOFINS>0.33</vCOFINS>' +
                        '<vPISST>0.00</vPISST>' +
                        '<vCOFINSST>0.00</vCOFINSST>' +
                        '<vOutro>0.00</vOutro>' +
                    '</ICMSTot>' +
                    '<vCFe>4.40</vCFe>' +
                    '<vCFeLei12741>2.00</vCFeLei12741>' +
                '</total>' +
                '<pgto>' +
                    '<MP>' +
                        '<cMP>04</cMP>' +
                        '<vMP>30.00</vMP>' +
                    '</MP>' +
                    '<vTroco>25.60</vTroco>' +
                '</pgto>' +
                '<infAdic>' +
                    '<infCpl>Nao Aceitamos Devolucoes sem este Comprovante</infCpl>' +
                    '<obsFisco xCampo="04.04.05.04">' +
                        '<xTexto>Comete crime quem sonega</xTexto>' +
                    '</obsFisco>' +
                '</infAdic>' +
            '</infCFe>' +
            '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">' +
                '<SignedInfo>' +
                    '<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />' +
                    '<SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />' +
                    '<Reference URI="#CFe13190214200166000166599000162520038194198637">' +
                        '<Transforms>' +
                            '<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />' +
                            '<Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />' +
                        '</Transforms>' +
                        '<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />' +
                        '<DigestValue>3RkDPPFBvc7HTVFQ/xdEhtbNs769IDuEOnYKlFawcWs=</DigestValue>' +
                    '</Reference>' +
                '</SignedInfo>' +
                '<SignatureValue>oK1VIW6YLMt8V3yY2NdxZKHlZGOS7i7DMl90sxRHfebbHqYeEeovVPOC3T6/pdfYoaUDzk4sWFz/dffWaQ6lKgF8yM44BYX63c9V1vycfM8x8hXeAAK0Iwna0pp5g75d1SZxpe4DsP+McPsppAJiv3PX1swEsr3a6B6AUJFsN9huhugf4VsWcgPPzbMdxV1K6t20/6YJr77uf2YiLrRBN6JMeTTCaKndVYIImUJjDUmV194bhYmxl2lLDJK9MqPDcfeGRC4WyW4TESfTfQYNIAFOijapZt3LHUFakkmC42NPL0lwKXvZ8Fow618vSVm1PKnoK3i76MaxE9jl8hn8GQ==</SignatureValue>' +
                '<KeyInfo>' +
                    '<X509Data>' +
                        '<X509Certificate>MIIFzTCCBLWgAwIBAgICGuowDQYJKoZIhvcNAQENBQAwaDELMAkGA1UEBhMCQlIxEjAQBgNVBAgMCVNBTyBQQVVMTzESMBAGA1UEBwwJU0FPIFBBVUxPMQ8wDQYDVQQKDAZBQ0ZVU1AxDzANBgNVBAsMBkFDRlVTUDEPMA0GA1UEAwwGQUNGVVNQMB4XDTE4MDkyMDE0MjAwOVoXDTIzMDkxOTE0MjAwOVowgbIxCzAJBgNVBAYTAkJSMREwDwYDVQQIDAhBbWF6b25hczERMA8GA1UECgwIU0VGQVotU1AxGDAWBgNVBAsMD0FDIFNBVCBTRUZBWiBTUDEoMCYGA1UECwwfQXV0b3JpZGFkZSBkZSBSZWdpc3RybyBTRUZBWiBTUDE5MDcGA1UEAwwwRUxHSU4gSU5EVVNUUklBTCBEQSBBTUFaT05JQSBMVERBOjE0MjAwMTY2MDAwMTY2MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyFisbknHWpIDQhroPXCT6SJMqSMIxP/nSlxMseAgfd56ac8Mhwl9pXAMLBdz5rq+g83TcV16GFwPTZg1x9SZAbgrGkTTepaCh7lxTh9WuwBhhYU9fBnCNwZcWRjJStNErO2phqvyq9Oc/5rwEv8Vrokff9Ck1TBvXVZIUaBcFuB9dEMVFrxfdYvaRdlfTT9xFeDaLaXZkPOW5Or0rpGap2A10blt7mhuAVbhZrsTjX5SkNRUtNHWp/72e7Q5/5K+KoHXQvlpvQKwA3oaU9ODkrVrcCAsegFDz1d3EIF1KSVf8Nx2JF5pQ7r1m97Y7bxcMukFMq4edSwI624IF6er3wIDAQABo4ICNDCCAjAwCQYDVR0TBAIwADAOBgNVHQ8BAf8EBAMCBeAwLAYJYIZIAYb4QgENBB8WHU9wZW5TU0wgR2VuZXJhdGVkIENlcnRpZmljYXRlMB0GA1UdDgQWBBR7TIYiwFbiCkb/P94YmH2L6ylSxjAfBgNVHSMEGDAWgBQVtOORhiQs6jNPBR4tL5O3SJfHeDATBgNVHSUEDDAKBggrBgEFBQcDAjBDBgNVHR8EPDA6MDigNqA0hjJodHRwOi8vYWNzYXQuZmF6ZW5kYS5zcC5nb3YuYnIvYWNzYXRzZWZhenNwY3JsLmNybDCBpwYIKwYBBQUHAQEEgZowgZcwNQYIKwYBBQUHMAGGKWh0dHA6Ly9vY3NwLXBpbG90LmltcHJlbnNhb2ZpY2lhbC5jb20uYnIvMF4GCCsGAQUFBzAChlJodHRwOi8vYWNzYXQtdGVzdGUuaW1wcmVuc2FvZmljaWFsLmNvbS5ici9yZXBvc2l0b3Jpby9jZXJ0aWZpY2Fkb3MvYWNzYXQtdGVzdGUucDdjMHsGA1UdIAR0MHIwcAYJKwYBBAGB7C0DMGMwYQYIKwYBBQUHAgEWVWh0dHA6Ly9hY3NhdC5pbXByZW5zYW9maWNpYWwuY29tLmJyL3JlcG9zaXRvcmlvL2RwYy9hY3NhdHNlZmF6c3AvZHBjX2Fjc2F0c2VmYXpzcC5wZGYwJAYDVR0RBB0wG6AZBgVgTAEDA6AQDA4xNDIwMDE2NjAwMDE2NjANBgkqhkiG9w0BAQ0FAAOCAQEAMHliSH9gc+1ciPx+wR3/K1WHUBOH+4/FgyHvzk3j8DMk8OGFhyYyvfiXF3gn2KrscXGuT6TY/TQxyJIZjZzujkBc5eDnRPBYOSDkiWpA5vGS2ba8OdhpZrlDfaxgQPN4mX74rEsj1/zydwkfHlObSWWwfqvQqvnvMNYqFuAgVLHfKtikRXId2wuC9uozYpBNxxNWNiCJj2VqD68KL8S1M0locZe/Sq/1HtnziWKyYmnNW6xKcE8wAXOVh13I1eNvWOr8KKPEsoyIq4LdS9TBI82OgjFH/kVWTWCI1RmoSyaw/knlrjT70AseiUHygbDBADeMKAmUi+LlSl5ppV+rrw==</X509Certificate>' +
                    '</X509Data>' +
                '</KeyInfo>' +
            '</Signature>' +
        '</CFe>'
    }

    getXmlSAT(){
        return this.xml;
    }
}