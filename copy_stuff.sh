mkdir -p build/src/ballot_collector/pki
mkdir -p build/src/ballot_provider/pki
mkdir -p build/src/key_provider/pki
mkdir -p build/src/ballot_provider/ballot_templates

cp -r src/key_provider/pki/* build/src/key_provider/pki 
cp -r src/ballot_provider/pki/* build/src/ballot_provider/pki
cp -r src/ballot_provider/ballot_templates/* build/src/ballot_provider/ballot_templates
cp -r src/ballot_collector/pki/* build/src/ballot_collector/pki
