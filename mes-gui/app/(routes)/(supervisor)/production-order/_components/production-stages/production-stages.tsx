import { Assembly } from "./_components/assembly";
import { Geneaology } from "./_components/geneaology/geneaology";
import { PartsProduction } from "./_components/parts-production";
import { QualityControl } from "./_components/quality-control";

export function ProductionStages() {
    return (
        <div className="card shadow-sm h-full">
            <div className="card-body h-full">
                <div className="card-title">Production Stages</div>
                <div className="tabs tabs-lift h-full overflow-hidden">
                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Geneaology" defaultChecked/>
                    <div className="tab-content bg-base-100 border-base-300 p-6 overflow-auto">
                        <Geneaology></Geneaology>
                    </div>

                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Parts Production" />
                    <div className="tab-content bg-base-100 border-base-300 p-0 overflow-x-auto">
                        <PartsProduction></PartsProduction>
                    </div>

                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Assembly" />
                    <div className="tab-content bg-base-100 border-base-300 p-0 overflow-x-auto">
                        <Assembly></Assembly>
                    </div>

                    <input type="radio" name="my_tabs_3" className="tab" aria-label="Quality Control" />
                    <div className="tab-content bg-base-100 border-base-300 p-6">
                        <QualityControl></QualityControl>
                    </div>
                </div>
            </div>
        </div>
    )
}