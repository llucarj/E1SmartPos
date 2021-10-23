export default class NFCeXml{
    constructor(){
        this.xml = 
        '<?xml version="1.0" encoding="UTF-8"?>' +
        '<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe">' +
            '<NFe xmlns="http://www.portalfiscal.inf.br/nfe">' +
                '<infNFe versao="4.00" Id="NFe33180705481336000137651000000916401000005909">' +
                    '<ide>' +
                        '<cUF>33</cUF>' +
                        '<cNF>00000590</cNF>' +
                        '<natOp>VENDA CONSUMIDOR</natOp>' +
                        '<mod>65</mod>' +
                        '<serie>100</serie>' +
                        '<nNF>91640</nNF>' +
                        '<dhEmi>2018-07-03T15:03:09-03:00</dhEmi>' +
                        '<tpNF>1</tpNF>' +
                        '<idDest>1</idDest>' +
                        '<cMunFG>3304557</cMunFG>' +
                        '<tpImp>4</tpImp>' +
                        '<tpEmis>1</tpEmis>' +
                        '<cDV>9</cDV>' +
                        '<tpAmb>2</tpAmb>' +
                        '<finNFe>1</finNFe>' +
                        '<indFinal>1</indFinal>' +
                        '<indPres>1</indPres>' +
                        '<procEmi>0</procEmi>' +
                        '<verProc>DJPDV 1.5.4</verProc>' +
                    '</ide>' +
                    '<emit>' +
                        '<CNPJ>00000000000000</CNPJ>' +
                        '<xNome>Automacao Comercial</xNome>' +
                        '<xFant>SYSTEM</xFant>' +
                        '<enderEmit>' +
                            '<xLgr>Avenida ABC</xLgr>' +
                            '<nro>70</nro>' +
                            '<xBairro>Centro</xBairro>' +
                            '<cMun>3304557</cMun>' +
                            '<xMun>Rio de Janeiro</xMun>' +
                            '<UF>RJ</UF>' +
                            '<CEP>20071001</CEP>' +
                            '<cPais>1058</cPais>' +
                            '<xPais>BRASIL</xPais>' +
                            '<fone>1133835927</fone>' +
                        '</enderEmit>' +
                        '<IE>11111111</IE>' +
                        '<IM>0000000</IM>' +
                        '<CRT>1</CRT>' +
                    '</emit>' +
                    '<det nItem="1">' +
                        '<prod>' +
                            '<cProd>1</cProd>' +
                            '<cEAN>SEM GTIN</cEAN>' +
                            '<xProd>NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</xProd>' +
                            '<NCM>01022911</NCM>' +
                            '<cBenef>1234567890</cBenef>' +
                            '<CFOP>5102</CFOP>' +
                            '<uCom>UN</uCom>' +
                            '<qCom>10.0000</qCom>' +
                            '<vUnCom>1.0000000000</vUnCom>' +
                            '<vProd>10.00</vProd>' +
                            '<cEANTrib>SEM GTIN</cEANTrib>' +
                            '<uTrib>UN</uTrib>' +
                            '<qTrib>10.0000</qTrib>' +
                            '<vUnTrib>1.0000000000</vUnTrib>' +
                            '<indTot>1</indTot>' +
                        '</prod>' +
                        '<imposto>' +
                            '<vTotTrib>1.62</vTotTrib>' +
                            '<ICMS>' +
                                '<ICMSSN102>' +
                                    '<orig>0</orig>' +
                                    '<CSOSN>102</CSOSN>' +
                                '</ICMSSN102>' +
                            '</ICMS>' +
                            '<PIS>' +
                                '<PISOutr>' +
                                    '<CST>49</CST>' +
                                    '<vBC>0.00</vBC>' +
                                    '<pPIS>0.0000</pPIS>' +
                                    '<vPIS>0.00</vPIS>' +
                                '</PISOutr>' +
                            '</PIS>' +
                            '<COFINS>' +
                                '<COFINSOutr>' +
                                    '<CST>49</CST>' +
                                    '<vBC>0.00</vBC>' +
                                    '<pCOFINS>0.0000</pCOFINS>' +
                                    '<vCOFINS>0.00</vCOFINS>' +
                                '</COFINSOutr>' +
                            '</COFINS>' +
                        '</imposto>' +
                        '<infAdProd>TESTE DE COMPLEMENTO A SER IMPRESSO NO CFE, COM PRODUTO COM DESCRICAO DE 120 CARACTERES</infAdProd>' +
                    '</det>' +
                    '<total>' +
                        '<ICMSTot>' +
                            '<vBC>0.00</vBC>' +
                            '<vICMS>0.00</vICMS>' +
                            '<vICMSDeson>0.00</vICMSDeson>' +
                            '<vFCP>0.00</vFCP>' +
                            '<vBCST>0.00</vBCST>' +
                            '<vST>0.00</vST>' +
                            '<vFCPST>0.00</vFCPST>' +
                            '<vFCPSTRet>0.00</vFCPSTRet>' +
                            '<vProd>10.00</vProd>' +
                            '<vFrete>0.00</vFrete>' +
                            '<vSeg>0.00</vSeg>' +
                            '<vDesc>0.00</vDesc>' +
                            '<vII>0.00</vII>' +
                            '<vIPI>0.00</vIPI>' +
                            '<vIPIDevol>0.00</vIPIDevol>' +
                            '<vPIS>0.00</vPIS>' +
                            '<vCOFINS>0.00</vCOFINS>' +
                            '<vOutro>0.00</vOutro>' +
                            '<vNF>10.00</vNF>' +
                            '<vTotTrib>1.62</vTotTrib>' +
                        '</ICMSTot>' +
                    '</total>' +
                    '<transp>' +
                        '<modFrete>9</modFrete>' +
                    '</transp>' +
                    '<pag>' +
                        '<detPag>' +
                            '<tPag>03</tPag>' +
                            '<vPag>2.01</vPag>' +
                            '<card>' +
                                '<tpIntegra>1</tpIntegra>' +
                                '<CNPJ>84477152000170</CNPJ>' +
                                '<tBand>01</tBand>' +
                                '<cAut>000030034</cAut>' +
                            '</card>' +
                        '</detPag>' +
                        '<detPag>' +
                            '<tPag>02</tPag>' +
                            '<vPag>0.99</vPag>' +
                        '</detPag>' +
                        '<detPag>' +
                            '<tPag>01</tPag>' +
                            '<vPag>3.00</vPag>' +
                        '</detPag>' +
                        '<detPag>' +
                            '<tPag>04</tPag>' +
                            '<vPag>4.00</vPag>' +
                            '<card>' +
                                '<tpIntegra>2</tpIntegra>' +
                            '</card>' +
                        '</detPag>' +
                    '</pag>' +
                    '<infAdic>' +
                        '<infCpl>Trib aprox R$:0,42 Federal, 1,20 Estadual;Fonte:IBPT F3W1D7;</infCpl>' +
                    '</infAdic>' +
                '</infNFe>' +
                '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">' +
                    '<SignedInfo>' +
                        '<CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />' +
                        '<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />' +
                        '<Reference URI="#NFe33180705481336000137651000000916401000005909">' +
                            '<Transforms>' +
                                '<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />' +
                                '<Transform Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />' +
                            '</Transforms>' +
                            '<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />' +
                            '<DigestValue>7kCR1M/dm/DQM0WmQyXSLj7r6P4=</DigestValue>' +
                        '</Reference>' +
                    '</SignedInfo>' +
                    '<SignatureValue>ycRA7XNdUmn401+kTovSXJtSh9+a+umgcJX92n+b0Zged2+qIjsv002RGK8fb8/3w5ypKQahsbl6lf/KV68UL8DXQW1SWt1Fqc6jDMg86IahOfMAeCVDGKY36kFH80QwZLyTnDq8Zmzi7cul+tJC+gIBtE2QMekO/GTpRlF6R0dDxswGcySJY3yUuitz/oMP8ZXNZGmaQemUSSeTNL4+5vAngzobc8ATu8WbC5T7q5G6GAwoXCzxsykZl46zezfcV1iymWn8KEw97aYrudDE8njklMyqeiFTb1aK7FQQ/Ru9hN8pkf8Pllc7KjMrnB+ApWhmNfxfJoNQax54hztDeg==</SignatureValue>' +
                    '<KeyInfo>' +
                        '<X509Data>' +
                            '<X509Certificate>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</X509Certificate>' +
                        '</X509Data>' +
                    '</KeyInfo>' +
                '</Signature>' +
            '</NFe>' +
            '<protNFe versao="4.00">' +
                '<infProt>' +
                    '<tpAmb>2</tpAmb>' +
                    '<verAplic>SVRSnfce201806291346</verAplic>' +
                    '<chNFe>33180705481336000137651000000916401000005909</chNFe>' +
                    '<dhRecbto>2018-07-03T15:03:06-03:00</dhRecbto>' +
                    '<nProt>333180005216730</nProt>' +
                    '<digVal>7kCR1M/dm/DQM0WmQyXSLj7r6P4=</digVal>' +
                    '<cStat>100</cStat>' +
                    '<xMotivo>Autorizado o uso da NF-e</xMotivo>'+
                '</infProt>'+
            '</protNFe>' +
        '</nfeProc>'
    }

    getXmlNFCe(){
        return this.xml;
    }
}