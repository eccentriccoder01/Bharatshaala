#!/bin/bash

# Fix unused variables and missing dependencies

# MarketCard.js - remove unused variable
sed -i "s/const { name, image, rating, vendors, established, hours, specialties, priceRange, id } = market;/const { name, image, rating, vendors, established, hours, priceRange, id } = market;/" frontend/src/components/MarketCard.js

# PaymentGateway.js - remove unused variables and add default case
sed -i "s/const { user } = useAuth();/\/\/ const { user } = useAuth();/" frontend/src/components/PaymentGateway.js
sed -i "s/const { getCartSummary } = useCart();/\/\/ const { getCartSummary } = useCart();/" frontend/src/components/PaymentGateway.js

# ProductCard.js - add default case
sed -i "/switch (action) {/a\\      default:\\n        break;" frontend/src/components/ProductCard.js

# QuantitySelector.js - remove unused variable
sed -i "s/const selectedBulk =/\/\/ const selectedBulk =/" frontend/src/components/QuantitySelector.js

# SearchBar.js - remove unused import
sed -i "s/import React, { useState, useEffect } from 'react';/import React, { useState } from 'react';/" frontend/src/components/SearchBar.js

# Error.js - fix heading
sed -i 's/<h1 className="text-9xl font-bold text-orange-600 mb-4" {...props}><\/h1>/<h1 className="text-9xl font-bold text-orange-600 mb-4" {...props}>Error<\/h1>/' frontend/src/pages/Error.js

# Home.js - remove unused imports
sed -i "s/import React, { useState, useEffect, useRef } from 'react';/import React, { useState, useEffect } from 'react';/" frontend/src/pages/Home.js

# Settings.js - fix heading
sed -i 's/<h2 className="text-2xl font-bold text-gray-900 mb-6" {...props}><\/h2>/<h2 className="text-2xl font-bold text-gray-900 mb-6" {...props}>Settings<\/h2>/' frontend/src/pages/user/Settings.js

echo "Fixed main ESLint issues"
