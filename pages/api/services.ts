import type { NextApiRequest, NextApiResponse } from 'next'
import { getPrisma } from '@/lib/prisma'

const prisma = getPrisma()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { region, comuna, page = '1', perPage = '10' } = req.query
    const pageNum = Math.max(1, parseInt(Array.isArray(page) ? page[0] : page, 10) || 1)
    const per = Math.max(1, Math.min(100, parseInt(Array.isArray(perPage) ? perPage[0] : perPage, 10) || 10))

    const where: any = {}
    if (region && typeof region === 'string') {
      where.address = { regionCode: region }
    }
    if (comuna && typeof comuna === 'string') {
      where.address = { ...(where.address || {}), comunaCode: comuna }
    }

    // Only return published services by default
    where.status = 'PUBLISHED'

    const [items, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: { guide: { include: { address: true } } },
        skip: (pageNum - 1) * per,
        take: per,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.service.count({ where })
    ])

    res.status(200).json({ data: items, meta: { page: pageNum, per, total } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'internal_error' })
  }
}
