"use client";

import { Button } from "@/components/ui/button";
import {
    CheckCircle,
    XCircle,
    Home,
    Shield,
    FileText,
    Users,
    MessageCircle,
    AlertTriangle,
    Clock,
    ArrowRight,
    Building2,
    MapPin,
    BadgeCheck,
    Handshake,
    FileCheck,
    KeyRound,
    HelpCircle
} from "lucide-react";
import { generateRepresentationServiceMessage, generatePropertyNegotiationMessage, openWhatsApp } from "@/lib/services/whatsapp-messages";
import Image from "next/image";
import { LandingFooter } from "@/components/layout/landing-footer";
import { Property } from "@/lib/db/schema";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const risks = [
    {
        icon: XCircle,
        title: "Documentação incorreta",
        description: "Erros na documentação podem custar milhares de euros e até invalidar a compra"
    },
    {
        icon: XCircle,
        title: "Pendências ocultas",
        description: "Dívidas, hipotecas ou problemas legais não identificados que se tornam seu problema"
    },
    {
        icon: XCircle,
        title: "Preços inflacionados",
        description: "Sem conhecimento do mercado local, você pode pagar muito mais do que deveria"
    },
    {
        icon: XCircle,
        title: "Barreiras de idioma",
        description: "Contratos complexos em italiano podem esconder cláusulas prejudiciais"
    }
];

const benefits = [
    {
        icon: Shield,
        title: "Segurança jurídica total",
        description: "Validação completa por advogados especializados em direito imobiliário italiano",
        features: [
            "Verificação de títulos de propriedade",
            "Análise de certidões e registros",
            "Identificação de pendências legais",
            "Acompanhamento no cartório notarial"
        ]
    },
    {
        icon: Home,
        title: "Curadoria personalizada",
        description: "Encontramos os melhores imóveis baseados no seu perfil e objetivos",
        features: [
            "Análise detalhada das suas necessidades",
            "Busca direcionada no mercado italiano",
            "Pré-seleção de propriedades adequadas",
            "Relatório comparativo das opções"
        ]
    },
    {
        icon: FileText,
        title: "Toda documentação resolvida",
        description: "Cuidamos de toda a burocracia e papelada do processo",
        features: [
            "Gestão de procurações legais",
            "Preparação de toda documentação",
            "Traduções juramentadas necessárias",
            "Registro de propriedade"
        ]
    },
    {
        icon: Users,
        title: "Suporte em português",
        description: "Comunicação clara e suporte próximo durante todo o processo",
        features: [
            "Atendimento em português",
            "Equipe que vive na Itália",
            "Disponibilidade para dúvidas",
            "Acompanhamento até a entrega das chaves"
        ]
    }
];

const processSteps = [
    {
        number: "01",
        icon: Users,
        title: "Entenda suas necessidades",
        description: "Conversamos para entender exatamente o que você procura, orçamento e objetivos"
    },
    {
        number: "02",
        icon: MapPin,
        title: "Curadoria de imóveis",
        description: "Buscamos e selecionamos as melhores opções que se encaixam no seu perfil"
    },
    {
        number: "03",
        icon: FileCheck,
        title: "Verificação completa",
        description: "Inspeção física, análise documental e validação jurídica de cada propriedade"
    },
    {
        number: "04",
        icon: Handshake,
        title: "Negociação e fechamento",
        description: "Negociamos o melhor preço e cuidamos de toda documentação até a escritura"
    },
    {
        number: "05",
        icon: KeyRound,
        title: "Entrega das chaves",
        description: "Acompanhamos até o final e entregamos as chaves do seu imóvel na Itália"
    }
];

const faqData = [
    {
        category: "Sobre a Assessoria",
        questions: [
            {
                q: "Como funciona a assessoria de compra?",
                a: "Cuidamos de todo o processo: desde a busca e seleção de imóveis até a validação jurídica, documentação e acompanhamento na escritura. Você tem suporte em português do início ao fim, com nossa equipe que vive na Itália."
            },
            {
                q: "Qual a diferença entre a assessoria e o Brasilità Insider?",
                a: "O Insider é uma comunidade de aprendizado com consultoria coletiva mensal, ideal para quem quer se preparar e aprender. A assessoria completa é um serviço personalizado onde fazemos todo o trabalho para você - da busca à entrega das chaves."
            },
            {
                q: "Quanto custa a assessoria?",
                a: "O investimento varia de acordo com o tipo e valor do imóvel. Enviamos uma proposta personalizada após entender suas necessidades. Entre em contato via WhatsApp para mais detalhes."
            },
            {
                q: "Como recebo a proposta de preço?",
                a: "Após nossa primeira conversa no WhatsApp, onde entendemos seu caso, enviamos uma proposta detalhada com escopo completo e investimento. Sem compromisso."
            }
        ]
    },
    {
        category: "Processo e Documentação",
        questions: [
            {
                q: "Preciso ter cidadania italiana para comprar?",
                a: "Não! Qualquer pessoa pode comprar imóveis na Itália, mesmo sem cidadania. O processo é um pouco diferente, mas totalmente viável. Cuidamos de toda a documentação necessária."
            },
            {
                q: "Moro no Brasil, consigo comprar mesmo assim?",
                a: "Sim! A maioria dos nossos clientes mora no Brasil. Fazemos todo o processo remotamente e você só precisa vir à Itália para assinar a escritura no cartório (ou pode fazer por procuração, dependendo do caso)."
            },
            {
                q: "Quanto tempo leva o processo completo?",
                a: "Em média, de 2 a 4 meses desde o início da busca até a assinatura da escritura. O prazo varia conforme a complexidade do imóvel e a documentação envolvida."
            },
            {
                q: "Vocês cuidam de toda a burocracia?",
                a: "Sim. Toda a documentação, traduções, validações jurídicas, registro de propriedade e acompanhamento no cartório são nossa responsabilidade."
            }
        ]
    },
    {
        category: "Sobre os Imóveis",
        questions: [
            {
                q: "Já tenho um imóvel em mente que vi na internet. Vocês podem avaliar?",
                a: "Perfeitamente! Podemos fazer a validação jurídica, análise de documentação e acompanhamento da compra de imóveis que você já encontrou. Isso evita armadilhas e garante segurança."
            },
            {
                q: "Vocês vendem imóveis?",
                a: "Não somos imobiliária. Fazemos a curadoria e busca de imóveis no mercado italiano, mas a negociação é sempre entre você e o vendedor/imobiliária. Nosso papel é orientar e garantir sua segurança."
            },
            {
                q: "Consigo financiamento bancário na Itália?",
                a: "Para não-residentes, o financiamento é extremamente difícil e raramente aprovado. Nossa assessoria foca em clientes com capital próprio para investir."
            },
            {
                q: "Qual o valor mínimo de imóvel que trabalham?",
                a: "Trabalhamos com imóveis a partir de €30.000. Imóveis muito baratos geralmente têm questões complexas que exigem assessoria especializada ainda mais criteriosa."
            }
        ]
    },
    {
        category: "Timing e Preparação",
        questions: [
            {
                q: "Ainda estou juntando dinheiro. Quando devo contratar?",
                a: "Se ainda está se preparando financeiramente, o Brasilità Insider é ideal para você aprender e se preparar. A assessoria completa faz sentido quando você já tem capital disponível e está pronto para comprar nos próximos 3-6 meses."
            },
            {
                q: "Não estou pronto para decidir agora. O que devo fazer?",
                a: "Sem problema! Você pode conhecer o Brasilità Insider para aprender mais, continuar explorando imóveis na nossa plataforma ou entrar em contato quando se sentir pronto. Não há pressão ou prazo."
            }
        ]
    },
    {
        category: "Segurança e Garantias",
        questions: [
            {
                q: "Como sei que o imóvel não tem problemas legais?",
                a: "Fazemos validação jurídica completa com advogados especializados: verificação de títulos, certidões, registros, pendências e acompanhamento no cartório notarial. Só avançamos se tudo estiver 100% regular."
            },
            {
                q: "E se algo der errado após a compra?",
                a: "Nossa assessoria inclui acompanhamento até a entrega das chaves e registro definitivo. Garantimos que toda documentação esteja correta antes de você assinar qualquer coisa."
            },
            {
                q: "Vocês trabalham com imobiliárias confiáveis?",
                a: "Sim. Temos uma rede de imobiliárias parceiras verificadas e confiáveis em diversas regiões da Itália. Quando você encontra um imóvel por conta própria, também validamos a idoneidade da imobiliária."
            }
        ]
    },
    {
        category: "Outras Dúvidas",
        questions: [
            {
                q: "Por que não fazer sozinho e economizar?",
                a: "Você pode, mas um único erro (documentação incorreta, pendências ocultas, problemas legais) pode custar milhares de euros - muito mais que o investimento na assessoria. Segurança e tranquilidade têm valor."
            },
            {
                q: "Vocês atendem todas as regiões da Itália?",
                a: "Sim, atendemos todo o território italiano. Temos expertise especial nas regiões mais procuradas por brasileiros, mas trabalhamos em qualquer lugar."
            },
            {
                q: "Posso cancelar a assessoria no meio do processo?",
                a: "Nosso contrato prevê condições claras de cancelamento. Discutimos isso na proposta personalizada, sempre com total transparência."
            }
        ]
    }
];

interface AdvisoryClientProps {
    initialProperty?: (Omit<Property, 'originalUrl'> & { region?: { name: string } | null }) | null;
}

export function AdvisoryClient({ initialProperty = null }: AdvisoryClientProps) {
    const handleWhatsAppClick = () => {
        const message = initialProperty
            ? generatePropertyNegotiationMessage(initialProperty)
            : generateRepresentationServiceMessage();
        openWhatsApp(message);
    };

    return (
        <div className="min-h-screen bg-white pb-20 md:pb-0">
            {/* Mobile Sticky CTA Button */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-2xl p-4 safe-area-bottom">
                <Button
                    onClick={handleWhatsAppClick}
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg text-base py-6"
                >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Falar com especialista
                </Button>
            </div>

            {/* Property Context Banner */}
            {initialProperty && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200">
                    <div className="container mx-auto container-padding py-6">
                        <div className="max-w-4xl mx-auto">
                            <a
                                href={`/properties/${initialProperty.id}`}
                                className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-emerald-200 hover:border-emerald-300 hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                                    <Home className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-emerald-700 mb-1">
                                        Interessado neste imóvel?
                                    </p>
                                    <h3 className="font-bold text-slate-900 mb-1 truncate group-hover:text-emerald-700 transition-colors">
                                        {initialProperty.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {initialProperty.location}
                                        </span>
                                        <span className="font-bold text-emerald-600">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(initialProperty.price)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Nossa assessoria pode ajudar você a comprar este imóvel com total segurança
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section - Clean and Professional */}
            <section className="relative bg-slate-900 text-white py-20 md:py-32">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-90" />

                {/* Texture pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '120px 120px'
                    }} />
                </div>

                {/* Decorative gradient circles */}
                <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto container-padding relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-semibold mb-8">
                            <BadgeCheck className="w-4 h-4" />
                            Assessoria Especializada
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                            Compre seu imóvel na Itália
                            <span className="block text-emerald-400 mt-2">
                                com segurança e tranquilidade
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Assessoria completa do início ao fim: curadoria, validação jurídica,
                            documentação e suporte em português até a entrega das chaves.
                        </p>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-emerald-400" />
                                <span>+220k seguidores</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-emerald-400" />
                                <span>Vivemos na Itália</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BadgeCheck className="w-5 h-5 text-emerald-400" />
                                <span>Dezenas de famílias atendidas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof from Insider */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-6">
                                <BadgeCheck className="w-4 h-4" />
                                Confiança e Autoridade
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                                Por que brasileiros confiam na Brasilità
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-10 h-10 text-emerald-600" />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 mb-2">+220k</p>
                                <p className="text-slate-600 font-medium">Seguidores Combinados</p>
                                <p className="text-sm text-slate-500 mt-2">Milhares de brasileiros nos acompanham diariamente</p>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-10 h-10 text-blue-600" />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 mb-2">100%</p>
                                <p className="text-slate-600 font-medium">Vivendo na Itália</p>
                                <p className="text-sm text-slate-500 mt-2">Conhecimento real do mercado italiano</p>
                            </div>

                            <div className="text-center">
                                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-10 h-10 text-purple-600" />
                                </div>
                                <p className="text-4xl font-bold text-slate-900 mb-2">Dezenas</p>
                                <p className="text-slate-600 font-medium">de Membros Ativos</p>
                                <p className="text-sm text-slate-500 mt-2">Comunidade exclusiva Brasilità Insider</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Risks Section - White background with red accents */}
            <section className="py-20 bg-white border-b border-slate-200">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 text-sm font-semibold mb-6">
                                <AlertTriangle className="w-4 h-4" />
                                Atenção
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                Os riscos de comprar sozinho
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Comprar um imóvel na Itália sem assessoria pode resultar em prejuízos de dezenas de milhares de euros
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {risks.map((risk, index) => {
                                const IconComponent = risk.icon;
                                return (
                                    <div key={index} className="flex items-start gap-4 p-6 bg-red-50/50 border-l-4 border-red-500 rounded-r-lg hover:bg-red-50 transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <IconComponent className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold mb-2 text-slate-900">{risk.title}</h3>
                                            <p className="text-slate-600">{risk.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <AlertTriangle className="w-7 h-7 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-3 text-slate-900">
                                        Não arrisque seu investimento
                                    </h3>
                                    <p className="text-lg text-slate-700 leading-relaxed">
                                        Um único erro na compra pode custar mais do que o valor completo da nossa assessoria.
                                        Proteja seu patrimônio com especialistas que conhecem cada detalhe do processo italiano.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section - Light gray background */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold mb-6">
                                <CheckCircle className="w-4 h-4" />
                                Assessoria Completa
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                O que nossa assessoria entrega
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Do primeiro contato até as chaves, cuidamos de tudo para você
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {benefits.map((benefit, index) => {
                                const IconComponent = benefit.icon;
                                return (
                                    <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-200">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold mb-2 text-slate-900">{benefit.title}</h3>
                                                <p className="text-slate-600">{benefit.description}</p>
                                            </div>
                                        </div>
                                        <ul className="space-y-3">
                                            {benefit.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-slate-700">
                                                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section - White background with blue accents */}
            <section id="como-funciona" className="py-20 bg-white">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
                                <Clock className="w-4 h-4" />
                                Processo Completo
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                Como funciona o processo
                            </h2>
                            <p className="text-xl text-slate-600">
                                5 etapas claras do primeiro contato até a entrega das chaves
                            </p>
                        </div>

                        <div className="space-y-8">
                            {processSteps.map((step, index) => {
                                const IconComponent = step.icon;
                                const isLast = index === processSteps.length - 1;
                                return (
                                    <div key={index} className="relative">
                                        <div className="flex items-start gap-6 bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-colors">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                                    <IconComponent className="w-9 h-9 text-white" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-400">{step.number}</span>
                                            </div>
                                            <div className="flex-1 pt-2">
                                                <h3 className="text-2xl font-bold mb-3 text-slate-900">{step.title}</h3>
                                                <p className="text-lg text-slate-600">{step.description}</p>
                                            </div>
                                        </div>
                                        {!isLast && (
                                            <div className="flex justify-center py-4">
                                                <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                            <div className="flex items-center justify-center gap-3 text-blue-900">
                                <Clock className="w-6 h-6" />
                                <span className="text-lg font-semibold">Processo completo leva entre 2-4 meses</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section - Light background */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-semibold mb-6">
                                <Users className="w-4 h-4" />
                                Nossa Equipe
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                Quem vai cuidar da sua compra
                            </h2>
                            <p className="text-xl text-slate-600">
                                Especialistas que vivem na Itália e conhecem o mercado por dentro
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Aloisio */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden ring-4 ring-slate-200">
                                        <Image
                                            src="/aloisio-insider.jpg"
                                            alt="Aloisio Cechinel"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Aloisio Cechinel</h3>
                                    <p className="text-emerald-600 font-semibold mb-4 text-lg">Fundador da Brasilità</p>
                                    <p className="text-slate-600 leading-relaxed">
                                        Criador de conteúdo de viagens com mais de 180 mil seguidores, ex-policial militar por 12 anos
                                        e especialista em vendas B2B. Na Brasilità, é responsável por oferecer
                                        suporte próximo e transparente a dezenas de famílias brasileiras.
                                    </p>
                                </div>
                            </div>

                            {/* Olavo */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden ring-4 ring-slate-200">
                                        <Image
                                            src="/olavo-insider.jpg"
                                            alt="Olavo Ferenshitz"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900">Olavo Ferenshitz</h3>
                                    <p className="text-emerald-600 font-semibold mb-4 text-lg">Co-fundador e Especialista</p>
                                    <p className="text-slate-600 leading-relaxed">
                                        Advogado e Planejador Financeiro CFP®, com experiência internacional no Brasil,
                                        EUA e Itália. Especialista em Investimentos Imobiliários na Itália e traz
                                        toda sua expertise jurídica e financeira.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps Section */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
                                <ArrowRight className="w-4 h-4" />
                                Próximos Passos
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                O que acontece quando você entrar em contato?
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Processo transparente e sem compromisso
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {/* Passo 1 */}
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-blue-100 h-full">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-xl">1</span>
                                    </div>
                                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 mt-2">
                                        <MessageCircle className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-center">Você envia mensagem</h3>
                                    <p className="text-slate-600 text-center leading-relaxed">
                                        Pelo WhatsApp, você nos conta sobre seu interesse e recebe retorno em até 24 horas
                                    </p>
                                </div>
                            </div>

                            {/* Passo 2 */}
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-emerald-100 h-full">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-xl">2</span>
                                    </div>
                                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 mt-2">
                                        <Users className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-center">Análise do seu caso</h3>
                                    <p className="text-slate-600 text-center leading-relaxed">
                                        Conversamos para entender suas necessidades, orçamento e objetivos com o imóvel
                                    </p>
                                </div>
                            </div>

                            {/* Passo 3 */}
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-purple-100 h-full">
                                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-xl">3</span>
                                    </div>
                                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 mt-2">
                                        <FileText className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 text-center">Proposta personalizada</h3>
                                    <p className="text-slate-600 text-center leading-relaxed">
                                        Enviamos uma proposta detalhada de como podemos ajudar, sem compromisso
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-slate-200 text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                                <p className="text-lg font-semibold text-slate-900">
                                    Sem compromisso • Sem pressão • Totalmente transparente
                                </p>
                            </div>
                            <p className="text-slate-600">
                                Você decide se faz sentido seguir em frente. Estamos aqui para ajudar, não para forçar uma decisão.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-semibold mb-6">
                                <HelpCircle className="w-4 h-4" />
                                Perguntas Frequentes
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">
                                Dúvidas sobre a assessoria?
                            </h2>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Respondemos as perguntas mais comuns para você tomar a melhor decisão
                            </p>
                        </div>

                        <div className="space-y-8">
                            {faqData.map((category, categoryIndex) => (
                                <div key={categoryIndex}>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-emerald-500">
                                        {category.category}
                                    </h3>
                                    <Accordion type="single" collapsible className="space-y-3">
                                        {category.questions.map((faq, faqIndex) => (
                                            <AccordionItem
                                                key={faqIndex}
                                                value={`${categoryIndex}-${faqIndex}`}
                                                className="bg-slate-50 rounded-lg border border-slate-200 px-6 data-[state=open]:bg-white data-[state=open]:border-emerald-200 data-[state=open]:shadow-sm transition-all"
                                            >
                                                <AccordionTrigger className="hover:no-underline py-4 text-left text-base">
                                                    <span className="font-semibold text-slate-900 pr-4">
                                                        {faq.q}
                                                    </span>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-600 pb-4 leading-relaxed text-base">
                                                    {faq.a}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                            <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                Ainda tem dúvidas?
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Fale conosco no WhatsApp e tire todas as suas dúvidas sem compromisso
                            </p>
                            <Button
                                onClick={handleWhatsAppClick}
                                size="lg"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            >
                                <MessageCircle className="h-5 w-5 mr-2" />
                                Falar com especialista
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-start gap-4 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl">
                            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div className="text-sm text-slate-700 leading-relaxed">
                                <p className="font-semibold text-slate-900 mb-2 text-base">Informação importante:</p>
                                <p>
                                    Os imóveis disponíveis na plataforma são anunciados pelas imobiliárias,
                                    que estão devidamente identificadas em cada anúncio. Você pode entrar em
                                    contato diretamente com a imobiliária para mais detalhes sobre o imóvel,
                                    ou caso tenha contratado nossa assessoria, faremos todos os contatos
                                    necessários e cuidaremos de todo o processo para você.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA - Dark section */}
            <section className="bg-slate-900 text-white py-20">
                <div className="container mx-auto container-padding text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Pronto para comprar seu imóvel na Itália?
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                            Fale com nossa equipe no WhatsApp e descubra como podemos ajudar você
                            a realizar esse sonho com total segurança
                        </p>
                        <Button
                            onClick={handleWhatsAppClick}
                            size="lg"
                            className="text-lg px-10 py-7 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-2xl hover:shadow-emerald-600/50 hover:scale-105 transition-all"
                        >
                            <MessageCircle className="h-6 w-6 mr-2" />
                            Falar com a equipe no WhatsApp
                        </Button>
                        <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm mt-8">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                                <span>Atendimento em português</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                                <span>Resposta rápida</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                                <span>Sem compromisso</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Insider CTA Section - Discreta */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto container-padding">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
                                <Users className="w-4 h-4" />
                                Alternativa
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                                Ainda não está pronto para comprar?
                            </h2>
                            <p className="text-lg text-slate-600">
                                Prepare-se com o <strong className="text-slate-900">Brasilità Insider</strong>
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-lg p-5 border border-slate-200">
                                <h3 className="text-base font-semibold text-slate-900 mb-3">O que você vai ter:</h3>
                                <ul className="space-y-2.5 text-slate-700 text-sm">
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span>Aulas sobre mercado imobiliário italiano</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span>Comunidade com outros investidores</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span>Consultoria mensal ao vivo</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span>Oportunidades exclusivas de imóveis</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-lg p-5 border border-slate-200">
                                <h3 className="text-base font-semibold text-slate-900 mb-3">Ideal para quem:</h3>
                                <ul className="space-y-2.5 text-slate-700 text-sm">
                                    <li className="flex items-start gap-2.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                                        <span>Quer aprender antes de investir</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                                        <span>Está se preparando financeiramente</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                                        <span>Busca networking qualificado</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
                                        <span>Quer entender o mercado italiano</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button
                                size="default"
                                variant="outline"
                                asChild
                                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                <a href="/insider">
                                    Conhecer o Insider
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <LandingFooter />
        </div>
    );
}
