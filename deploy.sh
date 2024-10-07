#!/bin/bash

CLIENT_DIR="currency-converter-client"
SERVER_DIR="currency-converter-server/CurrencyConverter"
SERVER_IP="REDACTED"
HELM_COMMAND="helm upgrade currency-converter currency-converter-k8s --values currency-converter-k8s/values.yaml"

bash ${CLIENT_DIR}/deploy.sh "${CLIENT_DIR}" &
bash ${SERVER_DIR}/deploy.sh "${SERVER_DIR}" &

wait

echo -e "\e[32mAll scripts have finished running.\e[0m"

echo -e "\e[32mConnecting to the server to run helm upgrade...\e[0m"
ssh yegor@"${SERVER_IP}" "${HELM_COMMAND}"

if [ $? -eq 0 ]; then
    echo -e "\e[32mHelm upgrade completed successfully.\e[0m"
else
    echo -e "\e[31mHelm upgrade failed.\e[0m"
fi