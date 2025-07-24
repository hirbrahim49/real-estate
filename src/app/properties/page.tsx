'use client';
import { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  phone: string;
  description: string;
  price: string;
  negotiable: string;
  imageurl: string;
  videourl: string;
  damage: string;
  approvaldate: string;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties?status=Approved');
        const data = await response.json();
        if (data.success) {
          setProperties(data.data);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) =>
    property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (property.damage && property.damage.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-6">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 1.5, repeat: Infinity, ease: 'linear' },
          }}
          className="relative w-20 h-20"
        >
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 border-r-amber-500"></div>
        </motion.div>
        <p className="text-slate-700 font-medium">Loading Properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://uploads-ssl.webflow.com/5e80894f63c557e083ed96b4/5e831d9d086b358d0f7b9743_texture-noise.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Available Properties
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Find verified properties with the best deals and direct contact.
          </motion.p>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <FiFilter /> Filters
          </button>
        </div>

        {/* Properties Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {filteredProperties.length === 0 ? (
            <div className="col-span-full text-center py-8 text-slate-500">
              {searchTerm
                ? 'No properties match your search'
                : 'No properties available yet'}
            </div>
          ) : (
            filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.imageurl || '/placeholder-property.jpg'}
                    alt={property.description}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium shadow-md">
                    ₦{property.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                    {property.name}'s Property
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {property.description}
                  </p>
                  {property.damage && (
                    <p className="text-sm text-red-500 mb-2">
                      Note: {property.damage}
                    </p>
                  )}
                  <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                    <span className="text-sm text-slate-500">
                      {property.negotiable
                        ? `Negotiable: ₦${property.negotiable}`
                        : 'Price fixed'}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        href="#"
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center hover:shadow-md"
                      >
                        View Details
                      </Link>
                      <a
                        href={`tel:${property.phone}`}
                        className="px-4 py-2 bg-slate-800 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center hover:shadow-md"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light mb-6 font-serif">
            Need Help Finding a Property?
          </h2>
          <p className="text-amber-100 mb-10 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Our team is ready to help you get the best deals.
          </p>
          <motion.a
            href="tel:09044174371"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:bg-slate-100 hover:shadow-xl"
          >
            Call Us Now
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
