import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, UserCheck, FileText, Users } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                <Logo className="text-primary-foreground" size={48} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-foreground">Brasilità</h1>
                                <p className="text-xs text-muted-foreground">Seu imóvel na Itália</p>
                            </div>
                        </Link>
                    </div>
                    <Link href="/" className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao início
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
                <div className="space-y-8">
                    {/* Title Section */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Política de Privacidade
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Sua privacidade é nossa prioridade. Conheça como protegemos e tratamos seus dados pessoais.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Última atualização: {new Date().toLocaleDateString('pt-BR')}
                        </p>
                    </div>

                    {/* LGPD Compliance Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Lock className="h-5 w-5 text-primary" />
                                <span>Cláusula de Proteção de Dados Pessoais – LGPD</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                A <strong>Brasilità</strong>, na condição de controladora dos dados pessoais, compromete-se a coletar,
                                armazenar e tratar as informações fornecidas pelos usuários exclusivamente para as finalidades relacionadas
                                à prestação dos serviços da plataforma, incluindo análise de perfil, organização das etapas da compra de
                                imóveis, conexão com profissionais e imobiliárias e comunicações sobre o andamento do processo.
                            </p>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Todos os dados serão tratados em conformidade com a Lei Geral de Proteção de Dados Pessoais
                                (Lei nº 13.709/2018), garantindo-se:
                            </p>
                        </CardContent>
                    </Card>

                    {/* Principles Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <FileText className="h-5 w-5 text-primary" />
                                    <span>Finalidade</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Uso das informações apenas para execução e melhoria dos serviços oferecidos.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <Eye className="h-5 w-5 text-primary" />
                                    <span>Transparência</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Fornecimento de informações claras sobre tratamento, compartilhamento e retenção dos dados.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <span>Segurança</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Adoção de medidas técnicas e administrativas para proteger as informações contra acessos não autorizados,
                                    perda ou destruição.
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <Users className="h-5 w-5 text-primary" />
                                    <span>Compartilhamento Controlado</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Eventual fornecimento de dados a terceiros (ex.: corretores, imobiliárias, prestadores de serviços)
                                    será limitado ao mínimo necessário para cumprir a finalidade, com obrigação de confidencialidade.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-2 lg:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-lg">
                                    <UserCheck className="h-5 w-5 text-primary" />
                                    <span>Direitos do Titular</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Garantia de acesso, correção, exclusão e portabilidade dos dados, bem como a possibilidade de
                                    revogar o consentimento a qualquer momento, mediante solicitação através dos canais oficiais da Brasilità.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Declaration */}
                    <Card className="border-primary/20 bg-primary/5">
                        <CardContent className="pt-6">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <UserCheck className="h-4 w-4 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-foreground">Declaração do Usuário</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        O usuário declara estar ciente e de acordo com esta cláusula, autorizando o tratamento
                                        dos seus dados nos termos aqui descritos.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Entre em Contato</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Para exercer seus direitos como titular dos dados ou esclarecer dúvidas sobre nossa política
                                de privacidade, entre em contato conosco:
                            </p>
                            <div className="space-y-2">
                                <p className="text-sm">
                                    <strong>Email:</strong> <a href="mailto:contato@brasilita.com" className="text-primary hover:underline">contato@brasilita.com</a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Back to Home */}
                    <div className="text-center pt-8">
                        <Link href="/">
                            <Button variant="outline" className="space-x-2">
                                <ArrowLeft className="h-4 w-4" />
                                <span>Voltar ao início</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border/50 mt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-sm text-muted-foreground">
                        <p>&copy; 2024 Brasilità. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}