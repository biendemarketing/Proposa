
import React, { useState, useMemo } from 'react';
import { mockTemplates } from '../../data/mockData';
import { Template, AppView } from '../../types';
import Icon from '../icons/Icon';
import { useAppContext } from '../../contexts/AppContext';
import TemplateCard from './TemplateCard';
import Card from '../ui/Card';

const TemplateList: React.FC = () => {
    const { navigate } = useAppContext();
    const [templates, setTemplates] = useState<Template[]>(mockTemplates);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const categories = useMemo(() => ['all', ...Array.from(new Set(mockTemplates.map(t => t.category)))], [mockTemplates]);

    const filteredTemplates = useMemo(() => {
        return templates
            .filter(t => categoryFilter === 'all' || t.category === categoryFilter)
            .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [templates, searchTerm, categoryFilter]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Plantillas</h1>
                    <p className="text-slate-500 mt-1">Crea propuestas más rápido usando plantillas pre-diseñadas.</p>
                </div>
                 <button
                    onClick={() => navigate(AppView.TEMPLATE_EDITOR)}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto"
                >
                    <Icon name="Plus" className="w-5 h-5 mr-2" />
                    Crear Plantilla
                </button>
            </div>

            <Card className="p-4">
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-grow w-full">
                        <input
                            type="text"
                            placeholder="Buscar plantillas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-100 text-slate-800 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-slate-400"
                        />
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon name="Search" className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="appearance-none w-full sm:w-52 bg-slate-100 text-slate-800 border border-slate-300 rounded-lg py-2 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                           {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat === 'all' ? 'Todas las categorías' : cat}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <Icon name="ChevronDown" className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map(template => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>

             {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500">No se encontraron plantillas. ¡Intenta ajustar tu búsqueda!</p>
                </div>
            )}
        </div>
    );
};

export default TemplateList;