import { useState, useEffect } from "react";
import { Container, Text, VStack, Box, Image, Input, SimpleGrid, Heading, Flex } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxW="container.xl" p={0}>
      <Box as="header" bg="blue.600" color="white" py={4} px={8}>
        <Heading as="h1" size="lg">NomadRank</Heading>
      </Box>
      <Box as="section" position="relative" height="50vh" width="100%" overflow="hidden">
        <Image src="/images/hero-background.jpg" alt="Tropical Beach" objectFit="cover" width="100%" height="100%" />
        <Flex position="absolute" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" align="center" justify="center">
          <VStack spacing={4} color="white" textAlign="center">
            <Heading as="h2" size="xl">Find Your Next Digital Nomad Destination</Heading>
            <Text fontSize="lg">Discover the best cities around the world for digital nomads.</Text>
          </VStack>
        </Flex>
      </Box>
      <Box as="section" p={8}>
        <Input
          placeholder="Search for a city or country"
          mb={8}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredCities.map(city => (
            <Box key={city.id} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Heading as="h3" size="md">{city.city}</Heading>
              <Text>{city.country}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Index;